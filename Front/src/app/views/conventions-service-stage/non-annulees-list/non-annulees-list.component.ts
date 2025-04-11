import { Component, OnInit } from '@angular/core';
import { NonAnnuleesService } from '../non-annulees.service';
import { CommonModule } from '@angular/common';
import { NonAnnuleesTableComponent } from '../non-annulees-table/non-annulees-table.component';
@Component({
  selector: 'app-non-annulees-list',
  standalone: true,
  imports: [CommonModule, NonAnnuleesTableComponent],
  templateUrl: './non-annulees-list.component.html'
})
export class NonAnnuleesListComponent implements OnInit {
  conventions: any[] = [];
  isLoading = true;

  constructor(private conventionService: NonAnnuleesService) {}

  ngOnInit(): void {
    this.loadConventions();
  }

  loadConventions(): void {
    this.conventionService.getConventionsNonAnnulees().subscribe({
      next: (data) => {
        this.conventions = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}