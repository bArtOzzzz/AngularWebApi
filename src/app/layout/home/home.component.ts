import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.month = new Date();
   }

  date:any = new Date();
  month:any = new Date();

  timer = 1800000;

  imgPath: any;
  currentGreeting: any;

  morningImages = [
    'https://images.wallpaperscraft.ru/image/single/rassvet_tuman_utro_149465_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/chashka_kofe_penka_korica_pechene_utro_44776_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/zima_ozero_derevo_sneg_par_utro_57370_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/reka_les_gory_146664_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/tropinka_derevia_solnechnyj_svet_153826_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/doroga_derevia_tuman_149858_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/voshod_tuman_derevia_133599_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/bereg_more_tuman_193763_2560x1600.jpg'
  ];

  afternoonImages = [
    'https://images.wallpaperscraft.ru/image/single/vodopad_par_den_61047_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/skameyki_bereg_ozero_peyzazh_gory_zhivopisnyy_nebo_oblaka_otrazhenie_yasno_den_62024_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/lodka_gory_ozero_135258_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/domik_les_leto_123013_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/poberezhe_pliazh_vid_sverhu_139531_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/okean_priboj_pena_more_voda_117846_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/doroga_derevia_razmetka_121714_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/osen_skamejki_stol_128676_2560x1600.jpg'
  ];

  nightImages = [
    'https://images.wallpaperscraft.ru/image/single/derevia_les_vid_sverhu_120486_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/girlianda_lampochki_svechenie_171212_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/vecher_zakat_derevo_krasivo_81886_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/doroga_vecher_razmetka_165566_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/les_tuman_zakat_137223_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/most_gory_avtomobili_vecher_119794_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/ozero_vecher_nebo_oblaka_120184_2560x1600.jpg',
    'https://images.wallpaperscraft.ru/image/single/derevo_pejzazh_sumerki_144447_2560x1600.jpg'
  ];

  greeting = [
    'Good morning!',
    'Good afternoon!',
    'Good night!'
  ];

  ngOnInit(): void {
    this.changeBackground();
  }

  changeBackground() {
    let date = new Date();
    if(date.getHours() < 12) {
      this.imgPath = this.morningImages[Math.floor(Math.random() * this.morningImages.length)];
      this.currentGreeting = this.greeting[0];
    }
    else if (date.getHours() < 18) {
      this.imgPath = this.afternoonImages[Math.floor(Math.random() * this.afternoonImages.length)];
      this.currentGreeting = this.greeting[1];
    }
    else {
      this.imgPath = this.nightImages[Math.floor(Math.random() * this.nightImages.length)];
      this.currentGreeting = this.greeting[2];
    }
    setInterval(() => {
      let date = new Date();
      if(date.getHours() < 12) {
        this.imgPath = this.morningImages[Math.floor(Math.random() * this.morningImages.length)];
        this.currentGreeting = this.greeting[0];
      }
      else if (date.getHours() < 18) {
        this.imgPath = this.afternoonImages[Math.floor(Math.random() * this.afternoonImages.length)];
        this.currentGreeting = this.greeting[1];
      }
      else {
        this.imgPath = this.nightImages[Math.floor(Math.random() * this.nightImages.length)];
        this.currentGreeting = this.greeting[2];
      }
    }, this.timer)
  }

}
