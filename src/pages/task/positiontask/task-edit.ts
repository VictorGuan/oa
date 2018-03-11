import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ModalController } from 'ionic-angular';
import { TaskProvider } from '../../../providers/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';

@IonicPage()
@Component({
  selector: 'page-task-edit',
  templateUrl: 'task-edit.html',
})
export class TaskEditPage {
  isReadyToSave: boolean;
  form: FormGroup;
  taskId: number;
  currentTask: any;
  positionName: string = "";
  positionId: number;
  images: Array<any> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    platform: Platform,
    private taskSrv: TaskProvider,
    private file: File,
    private imagePicker: ImagePicker,
    private toastCtrl: ToastController,
    formBuilder: FormBuilder) {
    this.taskId = navParams.get("taskId");
    platform.ready().then(() => {
      this.taskSrv.getPositionTaskById(this.taskId).subscribe((item) => {
        this.currentTask = item;
        this.positionId = item.position;
        this.positionName = item.positionName[0].name;
        this.form = formBuilder.group({
          name: [item.name, Validators.required],
          period_type: [item.period_type],
          period_value: [item.period_value, Validators.required],
          amount: [item.amount],
          desc: [item.desc]
        });

        this.form.valueChanges.subscribe((v) => {
          this.isReadyToSave = this.form.valid;
        });
      });
    });
  }

  ionViewDidLoad() {

  }
  handleGoback() {
    this.navCtrl.pop();
  }

  // 选择岗位
  handleSelectPost() {
    let positionModal = this.modalCtrl.create('SelectPositionPage');
    positionModal.onDidDismiss(data => {
      if (data) {
        this.positionName = data.id;
        this.positionId = data.name;
      }
    });
    positionModal.present();
  }

  handleSubmit() {
    if (!this.form.valid) { return; }
    let newItem = this.form.value;
    let arr = [];
    let describles: Array<any> = this.currentTask.describles;
    describles.filter((d) => { d.type != 0 }).forEach((e) => {
      arr.push({
        id: e.id
      });
    });
    let desc = newItem.desc;
    if (!desc)
      desc = "";
    let data = {
      name: newItem.name,
      period_value: newItem.period_value,
      period_type: newItem.period_type,
      amount: newItem.amount,
      desc: desc,
      docs: arr
    };
    console.dir(data);
    let promises = [];
    this.images.forEach((imgs) => {
      imgs.values.forEach(element => {
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
      this.taskSrv.editAutoTask(this.taskId, docs, data).subscribe(v => {
        if (v) {
          let toast = this.toastCtrl.create({
            message: "修改成功",
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
