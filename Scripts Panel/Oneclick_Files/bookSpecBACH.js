var bookSpec =
{
    custom_export_folder: "indesign_export_BACH/",
    
    default_unit_thumnail: "thumbnails/portada_thumb_",

    //previousStyle
    //nextStyle
    //isPreviousStyleFromSameTextFrame
    //isPreviousStyleRecognized
    //isNextStyleFromSameTextFrame
    //isNextStyleRecognized
    //currPageIndex
    //currPageItem
    //currPageItemIndex
    //currPageItemZIndex
    //currParagraphIndex
    //currParagraph
    //currContents
    //style
    //html
    //bookContent
    //workingNode
    //NodeWithExtras


    caches:
    {
        numPreguntaActividad: 1
    },

    p_:
    {
		
		'sin_tratar': function()
        {
            scope.workingNode.nodeAppend ('p', undefined, undefined, [scope.currContents.trim ()]);
        },   
		
		
        '_00_0-NUM-UNIDAD': function() {
            if (!scope.bookContent.first() || scope.bookContent.first().className !== 'titulo_unidad') {
                scope.bookContent.node('section', 'titulo_unidad').prepend().node('h1').append();
            }
            var h1Props = {};
            h1Props['data-thumb'] = bookSpec.default_unit_thumnail + scope.currContents + '.jpg'
            scope.bookContent.first().first().properties = h1Props;
            scope.bookContent.first().first().node('span', undefined, undefined, [scope.currContents + ' ']).prepend();
            scope.workingNode = scope.bookContent;
        },
        '00.0_NUM.UNIDAD': function() { bookSpec.p_['_00_0-NUM-UNIDAD']() },

        '_00_1-TITULO-1-LINEA': function() {
            if (!scope.bookContent.first() || scope.bookContent.first().className !== 'titulo_unidad') {
                scope.bookContent.node('section', 'titulo_unidad').prepend().node('h1').append();
            }
            scope.bookContent.first().first().contents.push(scope.currContents.replace(/(?:\r\n|\r|\n)/g, ' '));
            scope.workingNode = scope.bookContent;
        },
        '_00_2-TITULO-2-LINEAS': function() { bookSpec.p_['_00_1-TITULO-1-LINEA']() },
        '_00_3-TITULO-3-LINEAS': function() { bookSpec.p_['_00_1-TITULO-1-LINEA']() },
        '_00_4-TITULO-4-LINEAS': function() { bookSpec.p_['_00_1-TITULO-1-LINEA']() },
        '00.1_TITULO.1LINEA'   : function() { bookSpec.p_['_00_1-TITULO-1-LINEA']() },

        '_01-NUM-EPIG-1-ORDEN': function() {
            var lastEpig1 = scope.bookContent.getLastByTag('h2');
            if (lastEpig1 && lastEpig1.first().first() === '00 ') {
                lastEpig1.first().contents = [scope.currContents.trim() + ' '];
            }
            else {
                scope.bookContent.node('h2', 'titulo_epigrafe_1er').append()
                    .node('span', undefined, undefined, [scope.currContents.trim() + ' ']).append();
                scope.workingNode = scope.bookContent;
            }
        },
        '01_NUM.EPIG.1.ORDEN': function() { bookSpec.p_['_01-NUM-EPIG-1-ORDEN']() },

        '_01-EPIG-1-ORDEN': function() {
            if (!(scope.bookContent.last().className === 'titulo_epigrafe_1er')) {
                scope.bookContent.node('h2', 'titulo_epigrafe_1er').append()
                    .node('span', undefined, undefined, ['00 ']).append();
            }
            scope.bookContent.last().contents.push(scope.currContents.trim());
            scope.workingNode = scope.bookContent;
        },
        '01_EPIG.1.ORDEN.A1': function() { bookSpec.p_['_01-EPIG-1-ORDEN']() },

        '_02-EPIG-2-ORDEN': function() {
            scope.currContents = scope.currContents.trim().split(' ');
            var num = scope.currContents[0];
            var cont = scope.currContents.slice(1).join(' ');
            scope.bookContent.node('div', 'separador').append();
            var h3 = scope.bookContent.node('h3', 'titulo_epigrafe_2do').append();
            h3.node('span', undefined, undefined, [num]).append();
            h3.contents.push(' ' + cont);
            scope.workingNode = scope.bookContent;
        },
        '02_EPIG.2.ORDEN.A1': function() { bookSpec.p_['_02-EPIG-2-ORDEN']() },

        '_03-EPIG-3-ORDEN': function(tag, className) {
            scope.workingNode = scope.bookContent;
            scope.workingNode.node(tag || 'h4', className || 'titulo_epigrafe_3er', undefined, [scope.currContents]).append();
        },
        '_04-EPIG-4-ORDEN': function() { bookSpec.p_['_03-EPIG-3-ORDEN']('h5', 'titulo_epigrafe_4o') },
        '03_Epig. 2 Orden': function() { bookSpec.p_['_03-EPIG-3-ORDEN']()                           },

        '_04_0-TEXTO-GRAL': function(className) {
            scope.workingNode.node('p', className, undefined, [scope.currContents]).append();
        },
        '_04_1-SANGRADO'         : function() { bookSpec.p_['_04_0-TEXTO-GRAL']('lista_indentada')       },
        '_04_3-SANGRADO'         : function() { bookSpec.p_['_04_0-TEXTO-GRAL']('lista_indentada_doble') },
        '_04_4-SANGRADO'         : function() { bookSpec.p_['_04_0-TEXTO-GRAL']('sangrado_3')            },
        '_04_0-TEXTO-GRAL_CENTRO': function() { bookSpec.p_['_04_0-TEXTO-GRAL']('sangrado_3')            },
        '_00_ANCLADOS'           : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                        },
        '_00_04_ANCLADO FORMULA' : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                        },
        '_04_X-OBJETO-ANCLADO'   : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                        },
        '04_TEXTO.GRAL'          : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                        },

        '_04_1-BOLOS': function(tag, className) {
            if (scope.previousStyle !== scope.style) {
                scope.workingNode = scope.workingNode.node(tag || 'ul', className || 'lista_bullets_azul').append();
            }
            scope.workingNode.node('li', undefined, undefined, [scope.currContents]).append();
            if (scope.nextStyle !== scope.style && (scope.workingNode.tag === 'ul' || scope.workingNode.tag === 'ol')) {
                scope.workingNode = scope.workingNode.parent;
            }
        },
        '_04_2-BOLOS-DESTACADOS': function() { bookSpec.p_['_04_1-BOLOS']()                                                       },
        '_04_1-BOLOS-PRACTICA'  : function() { bookSpec.p_['_04_1-BOLOS']('ul', 'lista_bullets_naranja')                          },
        '_04_3-GUIONES'         : function() { bookSpec.p_['_04_1-BOLOS']('ul', 'lista_guiones_azul lista_indentada')             },
        '_04_4-BOLOS-CLAROS'    : function() { bookSpec.p_['_04_1-BOLOS']('ul', 'lista_bullets_azul_claro lista_indentada_doble') },

        '_04_1-VINETAS': function(tag, className) {
            if (scope.previousStyle !== scope.style) {
                scope.workingNode = scope.workingNode.node(tag || 'ul', className || 'order-by-letters-azul').append();
            }
            scope.workingNode.node('li').append().node('span', undefined, undefined, [scope.currContents]).append();
            if (scope.nextStyle !== scope.style && (scope.workingNode.tag === 'ul' || scope.workingNode.tag === 'ol')) {
                scope.workingNode = scope.workingNode.parent;
            }
        },

        '_11_4_1_1_TEXTO_FILETES_TERCIADA': function(className1, className2) {
            scope.workingNode = scope.bookContent;
            scope.workingNode.node('section', className1 || 'caja_azul_linea').append()
                .node('section', className2 || 'caja_azul_linea_contenido').append()
                .node('p', undefined, undefined, [scope.currContents]).append();
        },
        '_05-DESTACADOS'                     : function() { bookSpec.p_['_11_4_1_1_TEXTO_FILETES_TERCIADA']('caja_azul_flecha', 'caja_azul_flecha_contenido') },
        '_05-DESTACADOS-Sangrado'            : function() { bookSpec.p_['_05-DESTACADOS']()                                                                   },
        '_11_2_1_1-EPIG-2-ORDEN-FILETE-1-2-3': function() { bookSpec.p_['_11_4_1_1_TEXTO_FILETES_TERCIADA']()                                                 },
        '_11_4_1_3-TEXTO-FILETES-3-COLUMNAS' : function() { bookSpec.p_['_11_4_1_1_TEXTO_FILETES_TERCIADA']()                                                 },

        'modelBoxOpener': function(tag1, className1, tag2, className2) {
            if (!scope.isPreviousStyleFromSameTextFrame || !scope.isPreviousStyleRecognized) {
                scope.workingNode = scope.bookContent.node(tag1, className1).append()
                    .node(tag2, className2).append();
                return true;
            }
            return false;
        },

        'modelBoxCloser': function() {
            if (!scope.isNextStyleFromSameTextFrame || !scope.isNextStyleRecognized) {
                scope.workingNode = scope.bookContent;
                return true;
            }
            return false;
        },

        '_18_2-TEXTOS-CITADOS': function(className){
            bookSpec.p_['modelBoxOpener']('section', 'caja_azul_citas', 'section', 'caja_azul_citas_contenido');
            scope.workingNode.nodeAppend('p', className || undefined, undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_18_0-TITULO'              : function() { bookSpec.p_['_18_2-TEXTOS-CITADOS']('caja_azul_citas_titulo')     },
        '_18_1-ENTRADILLA-CITADOS'  : function() { bookSpec.p_['_18_2-TEXTOS-CITADOS']('caja_azul_citas_entradilla') },
        '_18_3-FIRMAS-CITADOS'      : function() { bookSpec.p_['_18_2-TEXTOS-CITADOS']('caja_azul_citas_autor')      },
        '_04_5_0-TEXTOS-CITADOS'    : function() { bookSpec.p_['_18_2-TEXTOS-CITADOS']()                             },
        '_04_5_0-TEXTOS-CITADOS-SIN': function() { bookSpec.p_['_18_2-TEXTOS-CITADOS']()                             },

        '_07_0-TITULO': function() {
            if (scope.nextStyle == '_07_2-GLOSARIO') {
                scope.bookContent.node('p', 'titulo_glosario', undefined, [scope.currContents]).append();
            }
            else {
                scope.bookContent.node('p', 'titulo_plus', undefined, [scope.currContents]).append();
                if (scope.isNextStyleFromSameTextFrame && scope.isNextStyleRecognized) {
                    bookSpec.p_['modelBoxOpener']('section', 'caja_naranja_esquinas', 'section', 'caja_naranja_esquinas_plus_contenido');
                }
            }
            scope.workingNode = scope.bookContent;
        },

        '_07_2-GLOSARIO': function() {
            bookSpec.p_['modelBoxOpener']('section', 'caja_naranja_esquinas', 'section', 'caja_naranja_esquinas_contenido');
            scope.currContents = scope.currContents.split(':');
            scope.currContents[0] = '<strong class="tipo_naranja">'.concat(scope.currContents[0]);
            scope.currContents[0] = scope.currContents[0].concat(':</strong>');
            scope.currContents = scope.currContents.join('');
            scope.workingNode.node('p', undefined, undefined, [scope.currContents]).append();
            bookSpec.p_['modelBoxCloser']();
        },

        'model_07_plus': function(processor, args) {
            bookSpec.p_['modelBoxOpener']('section', 'caja_naranja_esquinas', 'section', 'caja_naranja_esquinas_plus_contenido');
            processor.apply(scope.workingNode, args);
            bookSpec.p_['modelBoxCloser']();
        },
        '_07_2-TEXTO'     : function() { bookSpec.p_['model_07_plus'](scope.workingNode.nodeAppend, ['p', undefined, undefined, [scope.currContents]])          },
        '_07_5-RESALTADOS': function() { bookSpec.p_['_07_2-TEXTO']()                                                                               },
        '_07_4-SANGRADO'  : function() { bookSpec.p_['_07_2-TEXTO']()                                                                               },
        '_07_ANCLADO'     : function() { bookSpec.p_['_07_2-TEXTO']()                                                                               },
        '_07_1-SUBTITULO' : function() { bookSpec.p_['model_07_plus'](scope.workingNode.nodeAppend, ['p', 'tipo_azul_oscuro', undefined, [scope.currContents]]) },
        '_07_3-BOLOS'     : function() { bookSpec.p_['model_07_plus'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_naranja'])                           },
        '_07_3-VINETAS'   : function() { bookSpec.p_['model_07_plus'](bookSpec.p_['_04_1-VINETAS'], ['ul', 'order-by-letters-naranja'])                      },

        'model_06': function(processor) {
            if (bookSpec.p_['modelBoxOpener']('section', 'caja_ejemplo', 'section', 'caja_ejemplo_contenido')) {
                scope.workingNode.nodeAppend('section', 'caja_ejemplo_enunciado');
                scope.workingNode.nodeAppend('section', 'caja_ejemplo_solucion');
            }
            processor();
            bookSpec.p_['modelBoxCloser']();
        },
        '_06_0-EJEMPLOS'   : function() { bookSpec.p_['model_06'](function() {scope.workingNode.parent.nodePrepend('p', 'caja_ejemplo_titulo', undefined, [scope.currContents])}) },
        '_06_1_0-ENUNCIADO': function() { bookSpec.p_['model_06'](function() {scope.workingNode.first().nodeAppend('p', undefined, undefined, [scope.currContents])})             },

        '_06_2_0-VINETAS-ENUNCIADO'     : function() {
            bookSpec.p_['model_06'](function() {
                if (scope.workingNode.className === 'caja_ejemplo_contenido') {
                    scope.workingNode = scope.workingNode.first();
                }
                bookSpec.p_['_04_1-VINETAS']('ul', 'order-by-letters-verde')
            });
        },

        '_06_1_1-SOLUCION'     : function(className) {
            bookSpec.p_['model_06'](function() {
                scope.workingNode.last().nodeAppend('p', className, undefined, [scope.currContents])
            });
        },
        '_06_1_1-SOLUCION-SANGRADO'       : function() { bookSpec.p_['_06_1_1-SOLUCION']()                        },
        '_06_2_1-SOLUCION'                : function() { bookSpec.p_['_06_1_1-SOLUCION']()                        },
        '_06_1_3-SANGRADO'                : function() { bookSpec.p_['_06_1_1-SOLUCION']('lista_indentada')       },
        '_06_2_1-SOLUCION-SANGRADO'       : function() { bookSpec.p_['_06_1_3-SANGRADO']()                        },
        '_06_1_5-SANGRADO'                : function() { bookSpec.p_['_06_1_1-SOLUCION']('lista_indentada_doble') },
        '_06_2_3-SANGRADO'                : function() { bookSpec.p_['_06_1_5-SANGRADO']()                        },
        '_06_2_5-SANGRADO'                : function() { bookSpec.p_['_06_1_5-SANGRADO']()                        },
        '_06_1_2-VINETA-SOLUCION_CENTRADO': function() { bookSpec.p_['_06_1_1-SOLUCION']()                        },
        '06_FORMULAS ANCLADAS'            : function() { bookSpec.p_['_06_1_1-SOLUCION']()                        },
        '_04_X-OBJETO-ANCLADO'            : function() { bookSpec.p_['_06_1_1-SOLUCION']()                        },

        '_06_1_2-BOLO-SOLUCION'     : function(className) {
            bookSpec.p_['model_06'](function() {
                if (scope.workingNode.className === 'caja_ejemplo_contenido') {
                    scope.workingNode = scope.workingNode.last();
                }
                bookSpec.p_['_04_1-BOLOS']('ul', className || 'lista_bullets_verde')
            });
        },
        '_06_1_4-GUION-SOLUCION': function() { bookSpec.p_['_06_1_2-BOLO-SOLUCION']('lista_guiones_verde') },

        '_06_1_2-VINETA-SOLUCION'     : function() {
            bookSpec.p_['model_06'](function() {
                if (scope.workingNode.className === 'caja_ejemplo_contenido') {
                    scope.workingNode = scope.workingNode.last();
                }
                bookSpec.p_['_04_1-VINETAS']('ul', 'order-by-letters-verde')
            });
        },

        'modelBoxOpenerActividades': function() {
            if (scope.bookContent.last() instanceof Node && scope.bookContent.last().className === 'comentario_texto_caja') {
                scope.workingNode = scope.bookContent.last();
            }
            else {
                scope.workingNode = scope.bookContent.node('section', 'comentario_texto_caja').append();
                bookSpec.caches.numPreguntaActividad = 1;
            }
        },

        '_10_0-ENCABEZADO_ACTIVIDADES': function() {
            bookSpec.p_['modelBoxOpenerActividades']();
            if (bookSpec.caches.numPreguntaActividad === 1) {
                scope.workingNode.nodeAppend('h2', 'comentario_texto_caja_titulo f-left', undefined, [scope.currContents]);
                scope.workingNode.nodeAppend('div', 'separador');
            }
            scope.workingNode = scope.bookContent;
        },

        '_10_1-ENUNCIADO-ACTIVIDADES': function() {
            bookSpec.p_['modelBoxOpenerActividades']();
            if (scope.workingNode.last() instanceof Node) {
                scope.workingNode.last().removeClass('sin_borde');
            }
            scope.workingNode.node('p', 'num_ejercicio', undefined, ['' + bookSpec.caches.numPreguntaActividad]).append();
            scope.workingNode.node('p', 'enunciado_ejercicio sin_borde', undefined, [scope.currContents]).append();
            bookSpec.caches.numPreguntaActividad++;
            scope.workingNode = scope.bookContent;
        },

        '_10_2-INTERIOR-ACTIVIDADES': function() {
            bookSpec.p_['modelBoxOpenerActividades']();
            scope.workingNode.node('p', 'enunciado_ejercicio sin_borde', undefined, [scope.currContents]).append();
            scope.workingNode = scope.bookContent;
        },
        '_10_4-SANGRADO': function() { bookSpec.p_['_10_2-INTERIOR-ACTIVIDADES']() },
        '_10_6-SANGRADO': function() { bookSpec.p_['_10_2-INTERIOR-ACTIVIDADES']() },

        'modelLists_10': function(processor, args) {
            if (scope.previousStyle !== scope.style) {
                bookSpec.p_['modelBoxOpenerActividades']();
            }
            processor.apply(undefined, args);
            if (scope.nextStyle !== scope.style) {
                scope.workingNode = scope.bookContent;
            }
        },
        '_10_3-BOLOS'  : function() { bookSpec.p_['modelLists_10'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_verde enunciado_ejercicio sin_borde'])      },
        '_10_5-GUION'  : function() { bookSpec.p_['modelLists_10'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_guiones_verde enunciado_ejercicio sin_borde'])      },
        '_10_3-VINETAS': function() { bookSpec.p_['modelLists_10'](bookSpec.p_['_04_1-VINETAS'], ['ol', 'order-by-letters-verde enunciado_ejercicio sin_borde']) },

        '00-ENCABEZADO-PRACTICA': function(className1, className2, tag) {
            scope.workingNode = scope.bookContent.nodeAppend('section', className1 || 'elabora_proyecto_caja');
            scope.workingNode.nodeAppend(tag || 'h2', className2 || 'elabora_proyecto_caja_titulo f-left', undefined, [scope.currContents]);
            scope.workingNode.nodeAppend('div', 'separador');
        },
        '00-ENCABEZADO-ACTIVIDADES'          : function() { bookSpec.p_['00-ENCABEZADO-PRACTICA']('elabora_organizador_caja', 'elabora_organizador_caja_titulo f-left', 'p') },
        '_16_01-EPIGRAFE-1-ORDEN'            : function() { bookSpec.p_['_04_0-TEXTO-GRAL']('elabora_proyecto_caja_subtitulo')                                               },
        '_16_04_01-TEXTO-GENERAL-JUSTIFICADO': function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                                                                                },
        '_16_04_01-TEXTO-GENERAL-BANDERA'    : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                                                                                },
        '_16_04_02_SANGRADO'                 : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                                                                                },
        '_16_05_01_VINETAS-SANGRADO'         : function() { bookSpec.p_['_04_0-TEXTO-GRAL']()                                                                                },
        '_16_04_02-BOLOS-PRACTICA'           : function() { bookSpec.p_['_04_1-BOLOS']('ul', 'lista_bullets_naranja')                                                        },
        '_16_04_02-VINETAS'                  : function() { bookSpec.p_['_04_1-VINETAS']('ul', 'order-by-letters-naranja')                                                   },

        '_12_1-EPIG-1-ORDEN': function() {
            scope.workingNode.node('h4', 'caja_borde_azul_titulo_grupo', undefined, [scope.currContents]).append();
        },
        '_11_1_EPIG-1-ORDEN': function() { bookSpec.p_['_12_1-EPIG-1-ORDEN']() },

        'model_12': function(processor, args) {
            bookSpec.p_['modelBoxOpener']('section', 'caja_borde_azul', 'section', 'caja_borde_azul_contenido');
            processor.apply(scope.workingNode, args);
            bookSpec.p_['modelBoxCloser']();
        },

        '_12_2-EPIG-2-ORDEN'               : function() { bookSpec.p_['model_12'](scope.workingNode.nodeAppend, ['p', 'caja_borde_azul_titulo', undefined, [scope.currContents]]) },
        '_11_2_0-EPIG-2-ORDEN'             : function() { bookSpec.p_['_12_2-EPIG-2-ORDEN']()                                                                         },
        '_12_2-TEXTO'                      : function() { bookSpec.p_['model_12'](scope.workingNode.nodeAppend, ['p', undefined, undefined, [scope.currContents]])                },
        '_11_4_1_0-TEXTO-SIN-FILETE'       : function() { bookSpec.p_['_12_2-TEXTO']()                                                                                },
        '_12_4-SANGRADO'                   : function() { bookSpec.p_['_12_2-TEXTO']()                                                                                },
        '_12_6-SANGRADO'                   : function() { bookSpec.p_['_12_2-TEXTO']()                                                                                },
        '_11_ANCLADOS'                     : function() { bookSpec.p_['_12_2-TEXTO']()                                                                                },
        '_11_4_1_0-TEXTO-SIN-FILETE_CENTRO': function() { bookSpec.p_['model_12'](scope.workingNode.nodeAppend, ['p', 'imagen_centrada', undefined, [scope.currContents]])        },
        '_12_3-BOLOS'                      : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_azul'])                                    },
        '_12_5-BOLOS'                      : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_azul'])                                    },
        '_11_4_2_0-BOLOS-SIN-FILETE'       : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_azul'])                                    },
        '_12_3-BOLOS-PRACTICA'             : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_bullets_naranja'])                                 },
        '_12_5-GUIONES'                    : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-BOLOS'], ['ul', 'lista_guiones_azul'])                                    },
        '_12_3-VINETAS'                    : function() { bookSpec.p_['model_12'](bookSpec.p_['_04_1-VINETAS'], ['ul', 'order-by-letters-azul'])                               },

    },


    
    tableStyles: function (fill_color_name)
    {
        var f_cell_tag    = null;
        var f_table_class = null;
        
        switch (fill_color_name)
        {
            case "TABLA_AZUL_ENCABEZADO-2":
            {
                f_cell_tag    = 'th';
                f_table_class = 'tabla_azul_rosa';
                
                break;
            }                
            
            case "TABLA_AZUL_ENCABEZADO-3":
            {
                f_cell_tag        = 'th';
                f_table_class     = 'tabla_azul_rosa';                    
                
                break;
            }
            
            case "TABLA_FONDO-1": { break; }
            case "TABLA_FONDO-2": { break; }
            
            case "TABLA_VERDE_ENCABEZADO-1":
            case "TABLA_VERDE_ENCABEZADO-2":
            {
                f_cell_tag    = 'th';
                f_table_class = 'tabla_verde_rosa';                    
                
                break;
            }
            
            case "01_TabEvolNaranja":
            case "02_TabEvolNaranja":
            case "03_TabEvolNaranja":
            case "04_TabEvolNaranja":
            {
                f_table_class = 'elabora_proyecto_caja table';
                break;
            }

            case "TABLA_NARANJA_ENCABEZADO-1":
            case "TABLA_NARANJA_ENCABEZADO-2":
            {
                f_table_class = 'tabla_naranja';
                break;
            }
        }    
        
        return { cell_tag:f_cell_tag, table_class:f_table_class };
    },
    
    
    
    specialCharsDictionaries:
    {
        'MMGreek':
        {
            'A': '&Alpha;',
            'B': '&Beta;',
            'C': '&Gamma;',
            'D': '&Delta;',
            'E': '&Epsilon;',
            'F': '&Zeta;',
            'G': '&Eta;',
            'H': '&Theta;',
            'I': '&Iota;',
            'J': '&Kappa;',
            'K': '&Lambda;',
            'L': '&Mu;',
            'M': '&Nu;',
            'N': '&Xi;',
            'O': '&Omicron;',
            'P': '&Pi;',
            'Q': '&Rho;',
            'R': '&Sigma;',
            'S': '&Tau;',
            'T': '&Upsilon;',
            'U': '&Phi;',
            'V': '&Chi;',
            'W': '&Psi;',
            'X': '&Omega;',
            'Y': '&upsih;',
            'Z': '&Upsilon;',
            '\\': '&chi;',
            ']': '&phi;',
            '^': '&delta;',
            '_': '&rho;',
            'a': '&alpha;',
            'b': '&beta;',
            'c': '&gamma;',
            'd': '&delta;',
            'e': '&epsilon;',
            'f': '&epsilon;',
            'g': '&zeta;',
            'h': '&eta;',
            'i': '&theta;',
            'j': '&thetasym;',
            'k': '&iota;',
            'l': '&kappa;',
            'm': '&lambda;',
            'n': '&mu;',
            'o': '&nu;',
            'p': '&xi;',
            'q': '&omicron;',
            'r': '&pi;',
            's': '&piv;',
            't': '&rho;',
            'u': '&rho;',
            'v': '&sigma;',
            'w': '&#x3c2;',
            'x': '&tau;',
            'y': '&upsilon;',
            'z': '&phi;',
            '{': '&phi;',
            '|': '&chi;',
            '}': '&psi;',
            '~': '&omega;'
        }
    },

    inlineStylesVars: function()
    {
        var regArea1 = app.activeDocument.characterStyleGroups.itemByName('_Frutiger-Serif-LT-Pro').characterStyleGroups.itemByName('_COLORES').characterStyles.itemByName('_01-Regular-Area');
        scope.regArea1 = regArea1.isValid ? regArea1 : undefined;

        scope.bold1                 = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_06-Bold'                  );

        scope.bold2                 = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_03-Bold'                  );

        scope.bold3                 = getCharacterStyleIfUsed('_Frutiger-LT-Std-Condensed', '_67-Bold-Condensed'        );

        scope.bold4                 = getCharacterStyleIfUsed('04_Text Gral',               '04_NEGRA'                  );

        scope.gloss1                = getCharacterStyleIfUsed('04_Text Gral',               '_04-GLOSARIO'              );

        scope.gloss2                = getCharacterStyleIfUsed('Glosario',                   '_04-GLOSARIO'              );

        scope.italic1               = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_05-Regular-Italic'        );

        scope.italic2               = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_02-Regular-Italic'        );

        scope.lightItalic1          = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_02-Light-Italic'          );

        scope.lightCondensedItalic1 = getCharacterStyleIfUsed('_Frutiger-LT-Std-Condensed', '_47-Light-Condensed-Italic');

        scope.boldItalic1           = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_07-Bold-Italic'           );

        scope.boldItalic2           = getCharacterStyleIfUsed('_Frutiger-Serif-LT-Pro',     '_04-Bold-Italic'           );

        scope.boldItalic3           = getCharacterStyleIfUsed('_Frutiger-LT-Std-Condensed', '_67-Bold-Condensed-Italic' );
    },

    applyInlineChanges: function(paragraph)
    {
        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold1,                   '<strong>',                            '</strong>'       );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold2,                   '<strong>',                            '</strong>'       );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold3,                   '<strong>',                            '</strong>'       );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold4,                   '<strong>',                            '</strong>'       );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.regArea1,                '<span class="tipo_azul">',            '</span>'         );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.gloss1,                  '<span class="tipo_naranja"><strong>', '</strong></span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.gloss2,                  '<span class="tipo_naranja"><strong>', '</strong></span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic1,                 '<i>',                                 '</i>'            );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic2,                 '<i>',                                 '</i>'            );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.lightItalic1,            '<i>',                                 '</i>'            );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.lightCondensedItalic1,   '<i>',                                 '</i>'            );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic1,             '<strong><i>',                         '</i></strong>'   );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic2,             '<strong><i>',                         '</i></strong>'   );

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic3,             '<strong><i>',                         '</i></strong>'   );
    },

    isContent:
    {
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'multimedia', 'table'],
        classes: ['separador', 'caja_azul_flecha', 'comentario_texto_caja']
    },

    isTitle:
    {
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul'],
        classes: []
    },

    isText:
    {
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'li'],
        classes: ['caja_azul_flecha', 'caja_ejemplo_titulo', 'caja_ejemplo_contenido', 'caja_ejemplo_solucion', 'caja_ejemplo_enunciado']
    },

    htmlInitialisation: function()
    {
        var head =
        {
            mNode0: 'head',
            mNode0_0: 'meta',
            mProperties0_0: 'charset<utf-8',
            mNode0_1: 'meta',
            mProperties0_1: 'name<book-editor<<group< <<order< <<page< ',
            mNode0_2: 'link',
            mProperties0_2: 'href<book.css<<rel<stylesheet<<type<text/css'
        };
        scope.html.declarativeAppend (head);

        var body =
        {
            mNode0: 'body',
            mClass0: 'xcontainer',
            mNode0_0: 'div',
            mClass0_0: 'book-content-width hb-blue'
        };
        scope.html.declarativeAppend(body);
        scope.bookContent = scope.html.last().nodeAppend('div', 'book-content-width book-content-bg-color-white');
    },

    afterContentCreation: function()
    {

    },

    afterReorderByDeepness: function()
    {

    },

    afterReorderByPosition: function()
    {
        var pageW = pageWidthWithMargins(app.activeDocument.pages[0]);
        var columnW = columnWidth(app.activeDocument.pages[0]);
        var columnGutter = app.activeDocument.pages[0].marginPreferences.columnGutter;
        for (var i = 0; i < scope.bookContent.contents.length; i++)
        {
            if (scope.bookContent.get(i) instanceof scope.NodeWithExtras)
            {
                var width = Math.abs(scope.bookContent.get(i).currPageItemVisibleBounds[3] - scope.bookContent.get(i).currPageItemVisibleBounds[1]);
                if (width > pageW*0.9)
                {
                    scope.bookContent.get(i).addClass('parrafo_completo');
                }
                else if (width > (columnW*2 + columnGutter)*0.9 || scope.bookContent.get(i).isTitle())
                {
                    scope.bookContent.get(i).addClass('parrafo_2-3');
                }
                else
                {
                    scope.bookContent.get(i).newParent('aside');
                }
            }
        }

        scope.bookContent.concatenateSuccessive('aside');
    }

};