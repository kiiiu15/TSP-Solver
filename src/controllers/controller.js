
const {Service} = require("../services/service");

class Controller{
    static getData(req, res){
        
        const data = Service.getData();
        const selected = Service.getSelected();
        selected.features.forEach(element => {
            data.features = data.features.filter( city => city.properties.id !== element.properties.id && city.properties.nombre !== "Mar del Plata"  );
        });
        
        res.json(data);
    }

    static addCity(req, res){
       
        const city = Service.getByID(req.body.id);
        
        const selected = Service.getSelected();
        let size = selected.features.length;
        selected.features.splice(size-1,0,city);

        
        Service.setSelected(selected);

       res.json({"ok": true});

        
        
    }


    static DeleteCity(req, res){
       
        const selected = Service.getSelected();
        selected.features = selected.features.filter(element => element.properties.id != req.body.id); 
        Service.setSelected(selected);


       res.json({"ok": true});

        
        
    }


 
    static getSelected(req, res){
        const data =Service.getSelected()
        res.json(data);
    }


    
}


module.exports={Controller};