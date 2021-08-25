const {Tarea} = require('./tarea');

require('colors');

class Tareas {

    _listado = {};

    constructor () {

        this._listado = {};

    };

    get getListadoArr () {

        const listadoArr = [];

        Object.keys(this._listado).forEach( key => {

            const tarea = this._listado[key]

            listadoArr.push(tarea);

        });

        return listadoArr;

    };

    borrarTarea(ids) {

        ids.forEach(id => {

            if (this._listado[id]) {

                delete this._listado[id];
            };
        })
    };

    crearTarea(descripcion) {

        const tarea = new Tarea(descripcion);

        this._listado[tarea.id] = tarea;
    };

    cargarTareasFromArray ( tareas = [] ) {

        tareas.forEach( tarea => {

            this._listado[tarea.id] = tarea

        });

    } ;

    listadoCompleto () {

        let listadoTareas = '';

        Object.keys(this._listado).forEach( (key, i) => {

            let contador = `${i + 1}`.green;

            const tarea = this._listado[key];

            if (!tarea.completadoEn) {

                listadoTareas += `\n${contador}${'.'.green} ${tarea.descripcion} ${'::'.magenta} ${'Pendiente.'.red}`;
            
            } else {

                listadoTareas += `\n${contador}${'.'.green} ${tarea.descripcion} ${'::'.magenta} ${'Completado.'.green}`;

            };

        });

        return listadoTareas;
    };

    listarPendientesCompletadas( completadas = true) {

        if (completadas) {
            
            let listadoCompletadas = '';

            const completadas = this.getListadoArr.filter( tarea => tarea.completadoEn !== null);

            completadas.forEach( (completada, i) => {

                let contador = `${i + 1}.`.green;

                listadoCompletadas += `\n${contador} ${completada.descripcion} ${'::'.magenta} ` + `${completada.completadoEn}.`.green;

            });

            return console.log(listadoCompletadas);

        } else  {

            let listadoPendientes = '';

            const pendientes = this.getListadoArr.filter( tarea => tarea.completadoEn === null);

            pendientes.forEach( (pendiente, i) => {

                let contador = `${i + 1}.`.green;

                listadoPendientes += `\n${contador} ${pendiente.descripcion} ${'::'.magenta} ${'Pendiente.'.red}`;

            });

            return console.log(listadoPendientes);
        };

    };

    toggleCompletadas(ids = []) {

        ids.forEach( id => {

            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
    
                tarea.completadoEn = new Date().toISOString();

            };
           
        });

        this.getListadoArr.forEach(tarea => {

            if ( !ids.includes(tarea.id) ) {

                this._listado[tarea.id].completadoEn = null;
            };

        });

    };

};

module.exports = {

    Tareas,

};