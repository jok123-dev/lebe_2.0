import { Component, computed, inject, signal } from '@angular/core';
import { Copetencegriddataservice } from '../../dataservices/copetencegriddataservice';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Loginservice } from '../../dataservices/loginservice';
import { RouterLink } from '@angular/router';

const SUBJECT_MAP: Record<string, { icon: string; color: string; name: string }> = {
  informatik:  { icon: 'pi-desktop',    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',       name: 'Informatik' },
  mathe:       { icon: 'pi-calculator', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', name: 'Mathematik' },
  chemie:      { icon: 'pi-filter',      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',   name: 'Chemie' },
  physik:      { icon: 'pi-bolt',       color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',       name: 'Physik' },
  biologie:    { icon: 'pi-heart',      color: 'bg-green-500/10 text-green-600 dark:text-green-400',     name: 'Biologie' },
  deutsch:     { icon: 'pi-pencil',     color: 'bg-red-500/10 text-red-600 dark:text-red-400',         name: 'Deutsch' },
  englisch:    { icon: 'pi-language',   color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',   name: 'Englisch' },
  französisch: { icon: 'pi-comments',   color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', name: 'Französisch' },
  spanisch:    { icon: 'pi-globe',      color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-500', name: 'Spanisch' },
  geschichte:  { icon: 'pi-history',    color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', name: 'Geschichte' },
  geographie:  { icon: 'pi-map',        color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',       name: 'Geographie' },
  politik:     { icon: 'pi-users',      color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',     name: 'Politik' },
  wirtschaft:  { icon: 'pi-chart-line', color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',       name: 'Wirtschaft' },
  kunst:       { icon: 'pi-palette',    color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',       name: 'Kunst' },
  musik:       { icon: 'pi-volume-up',  color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400', name: 'Musik' },
  sport:       { icon: 'pi-percentage', color: 'bg-orange-600/10 text-orange-700 dark:text-orange-500', name: 'Sport' },
  religion:    { icon: 'pi-star',       color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',       name: 'Religion' },
  ethik:       { icon: 'pi-shield',     color: 'bg-lime-500/10 text-lime-600 dark:text-lime-400',       name: 'Ethik' }
};

@Component({
  selector: 'app-selectcompetencegrid',
  imports: [CommonModule, RippleModule, RouterLink],
  templateUrl: './selectcompetencegrid.html',
  styleUrl: './selectcompetencegrid.css',
})
export class Selectcompetencegrid {
  private competencegridDataService = inject(Copetencegriddataservice)
  private loginService = inject(Loginservice)
  
  protected competencegrids = this.competencegridDataService.competencegrids
  protected userToCompetencegrids = this.competencegridDataService.userToCompetencegrids

  private currentUserId = this.loginService.currentUserId

  public activeSort = signal<'year' | 'subject' | 'title'>('year');

  private myGrids = computed(() => {
    const userId = this.currentUserId();
    if (!userId) return [];

    const userRelations = this.userToCompetencegrids().filter(rel => rel.userId === userId);
    
    return userRelations.map(rel => {
      const fullGridDetails = this.competencegrids().find(grid => grid.id === rel.competencegridId);
      
      if (!fullGridDetails) return undefined;

      return {
        ...fullGridDetails,
        relationId: rel.id,
        accessDate: rel.accessDate,
        // 🌟 HIER IST DIE KORREKTUR: Wir schneiden uns das Jahr ("2026") direkt aus "2026-02-01" heraus!
        year: rel.accessDate.substring(0, 4) 
      };
    }).filter((grid): grid is NonNullable<typeof grid> => grid !== undefined);
  });

  // 🌟 SORTIERUNG & GRUPPIERUNG (Kann exakt so bleiben, da 'year' im Join injiziert wurde!)
  public groupedGrids = computed(() => {
    const type = this.activeSort();
    const items = [...this.myGrids()];

    if (type === 'year') {
      items.sort((a, b) => {
        if (b.year !== a.year) return b.year.localeCompare(a.year);
        return a.title.localeCompare(b.title);
      });
      return this.groupData(items, item => item.year);
    }

    if (type === 'subject') {
      items.sort((a, b) => {
        const nameA = this.getSubjectDetails(a.title).name;
        const nameB = this.getSubjectDetails(b.title).name;
        if (nameA !== nameB) return nameA.localeCompare(nameB);
        return a.title.localeCompare(b.title);
      });
      return this.groupData(items, item => this.getSubjectDetails(item.title).name);
    }

    if (type === 'title') {
      items.sort((a, b) => a.title.localeCompare(b.title));
      return this.groupData(items, item => item.title.charAt(0).toUpperCase());
    }

    return [];
  });

  private groupData(items: any[], keySelector: (item: any) => string) {
    const groups: { label: string; items: any[] }[] = [];
    items.forEach(item => {
      const label = keySelector(item);
      let group = groups.find(g => g.label === label);
      if (!group) {
        group = { label, items: [] };
        groups.push(group);
      }
      group.items.push(item);
    });
    return groups;
  }

  public getSubjectDetails(title: string) {
    const normalized = title.toLowerCase();
    const found = Object.keys(SUBJECT_MAP).find(s => normalized.includes(s));
    return found ? SUBJECT_MAP[found] : { icon: 'pi-book', color: 'bg-neutral-500/10 text-neutral-600', name: 'Sonstige' };
  }

  public selectGrid(id: string): void {
    console.log('Kompetenzraster ID geöffnet:', id);
  }

  
}
