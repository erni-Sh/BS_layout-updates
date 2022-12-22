window.onload = () => {
  const modal = {
    modalWrapper: document.getElementsByClassName('xmasModal__wrapper')[0],
    modalInner: document.getElementsByClassName('xmasModal__inner')[0],
    opener: document.getElementsByClassName('xmasButton')[0],
    promocodeTitle: document.getElementsByClassName('xmasModal__title')[0],
    promocodeValue: document.getElementsByClassName('xmasModal__promocode')[0].children[0],
    promocodes: [
      ['40% OFF', 'NAUGHTY40'],
      ['10% OFF', 'NAUGHTY10'],
      ['80% OFF', 'NAUGHTY80'],
      ['10% OFF', 'NAUGHTY10'],
      ['20% OFF', 'NAUGHTY20'],
    ],

    init() {
      this.opener.addEventListener('click', this.openModal);
      this.modalWrapper.addEventListener('click', this.closeModal);
      this.modalInner.addEventListener('click', e => e.stopPropagation());
    },
    setPromocode(section) {
      [ this.promocodeTitle.innerHTML, this.promocodeValue.innerHTML ] = this.promocodes[section]
    },
    openModal() {
      modal.modalWrapper.classList.add('xmasModal__wrapper_visible')
    },
    closeModal() {
      modal.modalWrapper.classList.remove('xmasModal__wrapper_visible')
    },
  }
  modal.init();

  const wheel = {
    rouletteWrapper: document.getElementsByClassName("landing-header__roulette")[0],
    drum: document.getElementsByClassName("landing-header__drum")[0].children[0],
    runner: document.getElementsByClassName("landing-header__drum-pointer")[0].children[0],
    curRotate: 0,

    init() {
      this.spin(this.curRotate);

      this.runner.addEventListener('click', () => {
        const newRotate = this.curRotate + 5000;
        const section = Math.floor((newRotate - 21) % 360 / 72);
        modal.setPromocode(section);
        this.spin(newRotate)
        this.curRotate = newRotate;

        this.rouletteWrapper.classList.add('landing-header__roulette_animated');

        setTimeout(() => {
          modal.openModal();
          this.rouletteWrapper.classList.remove('landing-header__roulette_animated');
        }, 13000);
      });
    },

    spinWheel() {
    },

    spin(deg) {
      wheel.drum.style.transform = `rotate(${deg}deg)`;
    },
  }
  wheel.init();
};