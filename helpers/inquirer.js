const inquirer = require('inquirer');

require('colors');

const menuPreguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green} Crear Tarea.`,
            },

            {
                value: '2',
                name: `${ '2.'.green} Listar Tareas.`,
            },

            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`,
            },
            
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes.`,
            },

            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s).`,
            },

            {
                value: '6',
                name: `${'6.'.green} Borrar tareas.`,
            },

            {
                value: '0',
                name: `${'0.'.green} ${'Salir'.red}.`,
            },

        ],
    },

];

const inquirerMenu = async () => {

    console.clear();

    console.log('============================'.green);
    console.log('   Seleccione una opción'.white);
    console.log('============================\n'.green);

    const {opcion} = await inquirer.prompt(menuPreguntas);

    return opcion

};

const inquirerPausa = async () => {

    const question = [

        {
            type: 'input',
            name: 'enter',
            message: `${'>>'.red} Presione ${'ENTER'.cyan.underline} para continuar.`,
        },

    ];

    return await inquirer.prompt(question);

};

const leerInput = async (mensaje) => {

    const question = [{

        type: 'input',
        name: 'descripcion',
        message: mensaje,
        validate(value) {

            if (value.length === 0) {

                return 'Por favor ingrese una descripción.';
            };

            return true;
        },

    }];

    const {descripcion} = await inquirer.prompt(question);

    return descripcion;

};

const listadoTareasBorrar = async (tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const index = `${ i + 1}.`.green;

        return {
            value: `${tarea.id}`,
            name: `${index} ${tarea.descripcion}`,
        };
        
    });

    choices.unshift({
        value: '0',
        name: `${'0.'.magenta}` + `${' Cancelar.'.magenta}`,
    });
    
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: `${'Borrar'.red.underline}.`,
            choices,
        },
    ];

    const {id} = await inquirer.prompt(questions);

    return id;

};

const inquirerConfirm = async (mensaje) => {

    const question = [

        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        },

    ];

    const {ok} = await inquirer.prompt(question);

    return ok;

};

const mostrarListadoCheckList = async (tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const index = `${ i + 1}.`.green;

        return {
            value: `${tarea.id}`,
            name: `${index} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false,
        };
        
    });
    
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: `${'Selecciones'.cyan.underline}.`,
            choices,
        },
    ];

    const {ids} = await inquirer.prompt(question);

    return ids;

};

module.exports = {

    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    inquirerConfirm,
    mostrarListadoCheckList,
};