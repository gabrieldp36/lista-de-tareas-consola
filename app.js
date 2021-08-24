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
                
               const id = await listadoTareasBorrar(tareas.getListadoArr);

               if (id !== '0') {

                    console.log();

                    const ok = await inquirerConfirm('¿' + 'Está Seguro'.red.underline + '?')
                    
                    if (ok) {

                            tareas.borrarTarea(id);
                            console.log();
                            console.log('   Tarea Borrada'.green + '.')

                    };
                };
                
            break;

        };

        guardarDb(tareas.getListadoArr);

        console.log();
        
        if (opcion !== '0') await inquirerPausa();
  
    } while ( opcion !== '0') { console.clear() };
        
};

main();
