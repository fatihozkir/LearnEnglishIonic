import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, IonText],
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
})
export class SectionHeaderComponent {
  @Input({ required: true }) sectionId!: number;
  @Input({ required: true }) title!: string;
  @Input() instruction?: string;
}
