
const {Service} = require("../services/service");

class Controller{
    static getData(req, res){
        
        const data = Service.getData();
        const selected = Service.getSelected();
        selected.features.forEach(element => {
            data.features = data.features.filter( city => city.properties.id !== element.properties.id  );
        });
        
        res.json(data);
    }

    static addCity(req, res){
       
        const city = Service.getByID(req.body.id);
        
        const selected = Service.getSelected();
        selected.features.push(city);

        
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
        res.json(Service.getSelected());
    }


    
}


module.exports={Controller};