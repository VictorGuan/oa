import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, ToastController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { TaskProvider } from '../../../providers/task';

@IonicPage()
@Component({
  selector: 'page-task-create',
  templateUrl: 'task-create.html',
})
export class TaskCreatePage {
  isReadyToSave: boolean;
  form: FormGroup;
  involveGroup1: Array<number> = [9];
  involveGroup2: Array<number> = [];
  images: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private imagePicker: ImagePicker,
    private toastCtrl: ToastController,
    private taskSrv: TaskProvider,
    private platform: Platform,
    private file: File,
    formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['', Validators.required],
      urgent_level: ['0'],
      date: [''],
      time: [''],
      amount: ['0'],
      desc: [''],
      involve1: ['我', Validators.required],
      involve2: ['']
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  handleGoback() {
    this.navCtrl.pop();
  }

  submit() {
    if (!this.form.valid) { return; }
    let newItem = this.form.value;
    let involves: Array<any> = [];
    this.involveGroup1.forEach((item) => {
      involves.push({
        staff: item,
        incharge: 1
      });
    });
    this.involveGroup2.forEach((item) => {
      involves.push({
        staff: item,
        incharge: 0
      });
    });

    let dt = newItem.date + ' ' + newItem.time;
    console.log("截止时间 %s", dt.toString());
    let data = {
      name: newItem.name,
      urgent_level: newItem.urgent_level,
      deadline: dt,
      amount: newItem.amount,
      desc: newItem.desc,
      involve: involves //参与者
    };
    console.dir(data);
    let promises = [];
    this.images.forEach((imgs) => {
      imgs.values.forEach(element => {
        console.log(element);
        console.log(typeof (element));
        let fileName: string = element;
        let lastIndex = fileName.lastIndexOf('/');
        let path = fileName.substr(0, lastIndex);
        fileName = fileName.substr(lastIndex + 1);
        promises.push(this.file.readAsArrayBuffer(path, fileName));
      });
    });

    Promise.all(promises).then((values) => {
      let docs: Array<Blob> = [];
      values.forEach((arr) => {
        docs.push(new Blob([arr]));
      });
      this.taskSrv.add(docs, data).subscribe(v => {
        if (v) {
          let toast = this.toastCtrl.create({
            message: "提交成功",
            duration: 1500
          });
          toast.onDidDismiss(() => {
            this.navCtrl.pop();
          });
          toast.present();
        }
      }, (err) => {
        console.error(err);
      });
    });
  }

  selectImages() {
    let options = {
      maximumImagesCount: 10
    };
    this.imagePicker.getPictures(options).then((results) => {
      this.images = [];
      let splitCount = Math.ceil(results.length / 4.0);
      let end = 0;
      let start = 0;
      for (var i = 0; i < splitCount; i++) {
        start = end;
        end = start + 4;
        if (end > results.length)
          end = results.length;
        this.images.push({
          key: i,
          values: results.slice(start, end)
        });
      }
      console.dir(this.images);
    }, (err) => {
      console.error(err);
    });
  }

  getKeys(item) {
    return Object.keys(item);
  }
}
