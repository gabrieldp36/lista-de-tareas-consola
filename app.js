require('colors');

const {Tareas} = require('./models/tareas');

const {inquirerMenu, 
    inquirerPausa, 
    leerInput, 
    listadoTareasBorrar, 
    inquirerConfirm,
    mostrarListadoCheckList} = require('./helpers/inquirer');

const {guardarDb, leerDb} = require('./helpers/guardarArchivo')


const main = async () =>{

    let opcion = '';

    const tareas = new Tareas();

    const tareasDb = leerDb();

    if ( tareasDb ) {

        tareas.cargarTareasFromArray(tareasDb);
    };

    do {
        
        opcion = await inquirerMenu();
        
        switch (opcion) {

            case '1':

                const descripcion = await leerInput(`${'Descripción'.magenta.underline}: `);

                tareas.crearTarea(descripcion);

            break;

            case '2':
            
                console.log( tareas.listadoCompleto() );

            break;

            case '3':
                
                tareas.listarPendientesCompletadas(true);
              
            break;

            case '4':
                
                tareas.listarPendientesCompletadas(false);
              
            break;

            case '5':
                
                const ids = await mostrarListadoCheckList(tareas.getListadoArr);

                tareas.toggleCompletadas(ids);

            break;

            case '6':
                
                const idsBorrar = await listadoTareasBorrar(tareas.getListadoArr);

               if (idsBorrar.length === 0) {
                   
                    console.log();

                } else if ( idsBorrar.length === 1 && idsBorrar.includes('0') ) {
                   
                    console.log();

                } else {
                    
                   const ok = await inquirerConfirm('¿' + 'Está Seguro'.red.underline + '?');
               
                    if (ok) {

                        tareas.borrarTarea(idsBorrar);
                        console.log();

                        if (idsBorrar.length === 1) {

                            console.log('   Tarea Borrada'.green + '.')

                        } else if (idsBorrar.length > 1) {

                            console.log('   Tareas Borradas'.green + '.')

                        };
                        
                    };

                }
                
            break;

        };

        guardarDb(tareas.getListadoArr);

        console.log();
        
        if (opcion !== '0') await inquirerPausa();
  
    } while ( opcion !== '0') { console.clear() };
        
};

main();