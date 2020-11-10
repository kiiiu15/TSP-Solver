const fs = require("fs");
class Service {

    static getByID(id) {
        const data = this.getData();

        const city = data.features.find(city => city.properties.id == id);

        return city;
    }


    static getData() {
        const data = this.readJson("src/public/Centros_Poblados.json");

        return data;
    }


    static getSelected() {

        const selected = this.readJson("src/public/selected.json");
        
        return selected;
    }


    static setSelected(selected) {
       
        
        this.writeJson("src/public/selected.json", selected);
    }

    static readJson(path) {

        return JSON.parse(fs.readFileSync(path));
    }

    static writeJson(path, data) {
        
        fs.writeFileSync(path, JSON.stringify(data, undefined, 2),{flag: "w"});
    }
}




module.exports = { Service };