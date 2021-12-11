var slist = {
  // (A) Yapılacaklar Listesi
  items : [], //Listeyi olusturdum
  hlist : null, // HTML yapılacaklar listesi
  hadd : null, // HTML öğe ekleme formu
  hitem : null, // HTML Öğe ekleme alanı
  init : function () {

    // (A1) HTML ÖĞELERİNİ AL + ÖĞE EKLEME OLUŞTUR
    slist.hlist = document.getElementById("todo-list");
    slist.hadd = document.getElementById("todo-add");
    slist.hitem = document.getElementById("list-item");
    slist.hadd.addEventListener("submit", slist.add);

    // (A2) Bu alanda bir liste olusturup sayfayi 
    //      kapattigimizda bilgilerin kayit edilmesi ve sonraki acisimizda 
    //      kaldigimiz yerden devam etmemizi sagliyor.
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    slist.items = JSON.parse(localStorage.items);

    // (A3) HTML YAPILACKLAR LİSTESİNİ ÇİZDİM
    slist.draw();
  },

  // (B) LİSTEYE YENİ ÖĞE EKLE
  add : function (evt) {
    // (B1) FORM GÖNDERMEYİ ENGELLE
    evt.preventDefault();

    // (B2) LİSTEYE YENİ ÖĞE EKLE
    slist.items.push({
      name : slist.hitem.value, // Görev Ismi
      done : false // True for "Bitirdim", false for degili yani "Bitirmedim"
    });
    slist.hitem.value = "";
    slist.save();

    // (B3) HTML YAPILACAKLAR LİSTESİNİ YENİDEN ÇİZ
    slist.draw();
  },

  // (C) HTML YAPILACAKLAR LİSTESİNİ ÇİZ
  draw : function () {
    slist.hlist.innerHTML = "";
    if (slist.items.length > 0) {
      let row, name, delbtn, okbtn;
      for (let i in slist.items) {
        // (C1) Görev Satiri
        row = document.createElement("div");
        row.className = "item-row";
        slist.hlist.appendChild(row);
        
        // (C2) Görev Ismi
        name = document.createElement("div");
        name.className = "item-name";
        name.innerHTML = slist.items[i].name;
        if (slist.items[i].done) {
          name.classList.add("item-got");
        }
        row.appendChild(name);

        // (C3) DELETE BUTTON
        delbtn = document.createElement("input");
        delbtn.className = "item-del";
        delbtn.type = "button";
        delbtn.value = "Del";
        delbtn.dataset.id = i;
        delbtn.addEventListener("click", slist.delete);
        row.appendChild(delbtn);
        
       
    
        // (C4) Bitirildi bitirilmedi butonu
        okbtn = document.createElement("input");
        okbtn.className = "item-ok";
        okbtn.type = "button";
        okbtn.value = slist.items[i].done ? "Fin" : "Unfin";
        okbtn.dataset.id = i;
        okbtn.addEventListener("click", slist.toggle);
        row.appendChild(okbtn);
      }
    }
  },

  // (D) Listeyi local alana kayit ettim
  save : function () {
    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    localStorage.items = JSON.stringify(slist.items);
  },

  // (E) Secilen görevi silmek
  delete : function () {
    if (confirm("Remove selected item?")) {
      slist.items.splice(this.dataset.id, 1); 
      slist.save();
      slist.draw();
    }
  },

  // (F) Görevi bitirdim veya bittirmedim diye seç
  toggle : function () {
    let id = this.dataset.id;
    slist.items[id].done = !slist.items[id].done;
    slist.save();
    slist.draw();
  }
};
window.addEventListener("DOMContentLoaded", slist.init);