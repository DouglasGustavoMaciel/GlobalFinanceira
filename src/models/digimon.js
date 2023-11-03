class Digimon {
    constructor(name, img, level) {
        this.name = name;
        this.img = img;
        this.level = level;
      }
    
      toJson() {
        return {
          name: this.name,
          img: this.img,
          level: this.level
        };
      }
    }
    module.exports = Digimon;