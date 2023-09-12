import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { BehaviorSubject, finalize } from 'rxjs';
import { CasherService } from 'src/app/casher/casher.service';
import { Menu } from 'src/app/casher/menu/menu.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {
  arrOfMenu: Menu[] = [];
  imgChangeEvent: any = "";
  croppedImage: any = "";
  editMode: boolean = false;
  itemIndex!: number;
  clickOnChooseFile: boolean = false;
  gettedImgPath: boolean = false;
  menuForm!: FormGroup;

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService) { }
  closeModal(e: any) {
    if (e.target.dataset.stateModal == 'bg-modal') {
      this.clearInputs();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.executeFunctions();
  }

  onFileChange(e: any) {
    const cropperImage: any = document.querySelector(".cropper-image");
    cropperImage.style.display = "flex"
    this.imgChangeEvent = e;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    localStorage.setItem("croppedImageItem", event.base64!)
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  getImgPath() {
    this.menuForm.get('image')?.setValue(this.croppedImage);
    this.gettedImgPath = true;
  }

  updateItem(index: any) {
    const itemImg: any = document.getElementById('itemImg');
    this.itemIndex = index;
    console.log("update");
    this.editMode = true;

    const item = this.casherService.getItemFromMenu(this.itemIndex!);
    this.menuForm.get('name')?.setValue(item.name);
    this.menuForm.get('category')?.setValue(item.category);
    this.menuForm.get('price')?.setValue(item.price);
    this.menuForm.get('image')?.setValue(item.image);
    itemImg.src = item.image;
  }

  private initForm() {
    let name = '';
    let category = '';
    let image = '';
    let price = '';

    if (this.editMode) {
      const item = this.casherService.getItemFromMenu(this.itemIndex!);
      name = item.name;
      category = item.category;
      image = item.image;
      price = item.price;
    }
    this.menuForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    this.casherService.isStoring.next(true);
    if (this.editMode) {
      this.casherService.updateItem(this.itemIndex, this.menuForm.value)
    } else {
      this.casherService.addItem(this.menuForm.value);
    }
    this.subscribeStoreMenu();
  }

  deleteItem(index: number) {
    this.casherService.isStoring.next(true);
    this.casherService.deleteItem(index);
    this.subscribeStoreMenu();
  }

  subscribeStoreMenu() {
    return this.dataStorageService.storeMenu().pipe(
      finalize(() => {
        this.casherService.isStoring.next(false);
        this.clearInputs();
      })
    ).subscribe();
  }


  async executeFunctions(): Promise<void> {
    const dataFromObservableOne = await this.subscribeToObservableOne();
    await this.subscribeToObservableTwo(dataFromObservableOne);
  }

  async subscribeToObservableOne(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.dataStorageService.fetchMenu().subscribe(
        (data: Menu[]) => {
          resolve(data);
        }
      );
    });
  }

  async subscribeToObservableTwo(dataFromObservableOne: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.casherService.arrOfMenuChanged.subscribe(
        (data: Menu[]) => {
          this.arrOfMenu = dataFromObservableOne
          resolve();
        }
      );
    });
  }

  clearInputs() {
    this.menuForm.get('name')?.setValue('');
    this.menuForm.get('category')?.setValue('');
    this.menuForm.get('price')?.setValue('');
    this.menuForm.get('image')?.setValue('');
  }
}
