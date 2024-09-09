import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { QuillModule } from 'ngx-quill';
import Quill from 'quill';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, QuillModule, PickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'quill-config';
  htmlText!: string;
  modules = {};

  displayEmoji = signal<boolean>(false);
  indexOfText = signal<any>(undefined);

  @ViewChild('inputVal') inputEditor?: ElementRef<any>;

  addEmoji(e: any) {
    console.warn('addEmoji', e.emoji.native);
    // console.warn('addEmoji', e);
    const { native } = e.emoji;
    const editor: any = this.inputEditor;
    const range = this.indexOfText();
    console.warn('indexOfText )=====>', this.indexOfText());
    const index = range ? range.index : 0;
    editor.quillEditor.insertText(index, native, 'api');
    editor.quillEditor.setSelection(index + 2, range);
    this.indexOfText.set({ index: index + 2, length: 0 });
    // this.displayEmoji.set(false);
  }

  openEmojiDialog() {
    this.displayEmoji.set(!this.displayEmoji());
  }
  onTypeInput(e: any) {
    console.warn('onTypeInput', e);
    const range = e.editor.getSelection();
    console.warn('getSelection', range);
  }
  onSection(e: any) {
    console.warn('onSection =======>', e.range);
    if (e.range) {
      this.indexOfText.set(e.range);
    }
    console.warn('🧧🧧🧧🧧', this.indexOfText());
  }
}
