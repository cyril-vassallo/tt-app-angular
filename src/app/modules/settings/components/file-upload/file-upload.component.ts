import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FileService } from 'src/app/shared/services/file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'input-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnDestroy {
  fileName = '';
  @Output() onPhotoUrlReceivedEvent = new EventEmitter<string>();
  subscriptions: Subscription = new Subscription();

  constructor(private fileService: FileService) {}

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.subscriptions.add(
      this.fileService.upload(file).subscribe((fileAndMeta) => {
        if (fileAndMeta && fileAndMeta.data.url) {
          this.onPhotoUrlReceivedEvent.emit(fileAndMeta.data.url);
        }
      })
    );
  }
}
