var bookSpec =
{
    custom_export_folder: "indesign_export_ESO/",

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
        _20_num: 1
    },

    p_:
    {
		'sin_tratar': function()
        {
            scope.workingNode.nodeAppend ('p', undefined, undefined, [scope.currContents.trim ()]);
        },   
		
		
        '[Basic Paragraph]': function() {
            $.writeln(scope.currParagraph.ruleBelowColor.name);
            if (scope.currParagraph.ruleBelowColor.name === 'Teoria_1') {
                bookSpec.p_['_10_4_SUBTITULO_RECUADRO']();
            }
            else if (scope.currParagraph.strokeColor.name === 'Paper') {
                bookSpec.p_['_01_4_NUM_EPIGRAFE']();
                $.writeln('col' + scope.currParagraph.fillColor.name);
                $.writeln('cont' + scope.currContents);
            }
        },

        'secureLastEpig': function() {
            var lastEpig = scope.bookContent.getLastByTag('h2');
            if (!(lastEpig && lastEpig.currPageIndex === scope.currPageIndex)) {
                lastEpig = scope.bookContent.nodeAppend('h2', '_01_1_EPIGRAFE_1ER_ORDEN_TEORIA');
                lastEpig.nodeAppend('span');
            }
            return lastEpig;
        },

        '_01_4_NUM_EPIGRAFE': function() {
            var lastEpig = bookSpec.p_['secureLastEpig']();
            lastEpig.first().contents.push(scope.currContents.trim());
            scope.workingNode = scope.bookContent;
        },
        '_01_4_NUM_EPIGRAFE_3ro': function() { bookSpec.p_['_01_4_NUM_EPIGRAFE']() },

        '_01_1_EPIGRAFE_1ER_ORDEN_TEORIA': function() {
            var lastEpig = bookSpec.p_['secureLastEpig']();
            lastEpig.contents.push(' ' + scope.currContents.trim());
            scope.workingNode = scope.bookContent;
        },
        '_01_2_EPIGRAFE_1ER_ORDEN_TEORIA_2_LINEAS'    : function() { bookSpec.p_['_01_1_EPIGRAFE_1ER_ORDEN_TEORIA']() },
        '_01_1_EPIGRAFE_1ER_ORDEN_TEORIA_3ro'         : function() { bookSpec.p_['_01_1_EPIGRAFE_1ER_ORDEN_TEORIA']() },
        '_01_2_EPIGRAFE_1ER_ORDEN_TEORIA_2_LINEAS_3ro': function() { bookSpec.p_['_01_1_EPIGRAFE_1ER_ORDEN_TEORIA']() },

        '_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA': function() {
            scope.currContents = scope.currContents.trim().split(' ');
            var num = scope.currContents[0].trim();
            var cont = scope.currContents.slice(1).join(' ').trim();
            //scope.bookContent.nodeAppend('div', 'separador');
            var h3 = scope.bookContent.nodeAppend('h3', '_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA');
            h3.nodeAppend('span', undefined, undefined, [num]);
            h3.contents.push(' ' + cont);
            scope.workingNode = scope.bookContent;
        },
        '_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA_3ro': function() { bookSpec.p_['_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA']() },
        '_02_1_EPIGRAFE_2DO_ORDEN_TEORIA'           : function() { bookSpec.p_['_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA']() },
        '_02_1_EPIGRAFE_2DO_ORDEN_TEORIA_3ro'       : function() { bookSpec.p_['_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA']() },

        '_04_1_CUERPO_LIBRO_GENERAL': function(className) {
            scope.workingNode.nodeAppend('p', className, undefined, [scope.currContents]);
        },
        '_04_4_CUERPO_GENERAL_COLOQUIO' : function() { bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']() },
        '_04_1_CUERPO_LIBRO_GENERAL_3ro': function() { bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']() },

        '_04_2_CUERPO_LIBRO_GENERAL_BOLOS': function(tag, className) {
            if (scope.previousStyle !== scope.style) {
                scope.workingNode = scope.workingNode.nodeAppend(tag || 'ul', className || 'lista_bullets_negro');
            }
            scope.workingNode.nodeAppend('li', undefined, undefined, [scope.currContents]);
            if (scope.nextStyle !== scope.style && (scope.workingNode.tag === 'ul' || scope.workingNode.tag === 'ol')) {
                scope.workingNode = scope.workingNode.parent;
            }
        },
        '_04_2_CUERPO_LIBRO_GENERAL_BOLOS_3ro': function() { bookSpec.p_['_04_2_CUERPO_LIBRO_GENERAL_BOLOS']()                            },
        '_04_3_CUERPO_LIBRO_GENERAL_GUION'    : function() { bookSpec.p_['_04_2_CUERPO_LIBRO_GENERAL_BOLOS']('ul', 'lista_guiones_negro') },
        '_04_3_CUERPO_LIBRO_GENERAL_GUION_3ro': function() { bookSpec.p_['_04_3_CUERPO_LIBRO_GENERAL_GUION']()                            },

        '_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA': function(tag, className) {
            scope.workingNode.nodeAppend(tag || 'h3', className || '_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA f-none', undefined, [scope.currContents.trim()]);
        },
        '_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA_3ro'    : function() { bookSpec.p_['_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA']()                                               },
        '_03_EPIGRAFE_3ER_ORDEN_TEORIA'            : function() { bookSpec.p_['_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA']('h4', '_02_1_1_EPIGRAFE_2DO_ORDEN_Num1_TEORIA') },
        '_03_EPIGRAFE_3ER_ORDEN_TEORIA_3ro'        : function() { bookSpec.p_['_03_EPIGRAFE_3ER_ORDEN_TEORIA']()                                                   },

        '_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA': function() {
            if (scope.currPageItem.strokeColor.name === 'Practica_2') {
                bookSpec.p_['modelDoubleBoxOpener']('section', 'caja_simple borde_naranja', 'section', 'caja_simple_contenido');
            }
            bookSpec.p_['_15_1_EPIGRAFE_1ER_ORDEN_PRACTICA']('p', '_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA reset-padding');
            bookSpec.p_['modelBoxCloser']();
        },
        '_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA_3ro': function() { bookSpec.p_['_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA']() },
        '_15_3_EPIGRAFE_3ER_ORDEN_PRACTICA'    : function() { bookSpec.p_['_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA']() },
        '_15_3_EPIGRAFE_3ER_ORDEN_PRACTICA_3ro': function() { bookSpec.p_['_15_2_EPIGRAFE_2DO_ORDEN_PRACTICA']() },

        'modelSimpleBoxOpener': function(tag, className) {
            if (!scope.isPreviousStyleFromSameTextFrame || !scope.isPreviousStyleRecognized) {
                scope.workingNode = scope.bookContent.node(tag, className).append();
                return true;
            }
            return false;
        },

        'modelDoubleBoxOpener': function(tag1, className1, tag2, className2) {
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

        '_05_1_DESTACADO_ASTERISCO': function(className) {
            bookSpec.p_['modelDoubleBoxOpener']('section', className || 'caja_simple borde_rosa caja_asterisco', 'section', 'caja_simple_contenido');
            scope.workingNode.nodeAppend('p', undefined, undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_05_1_DESTACADO_ASTERISCO_3ro': function() { bookSpec.p_['_05_1_DESTACADO_ASTERISCO']()                                        },
        '_05_2_DESTACADO_COMILLAS'     : function() { bookSpec.p_['_05_1_DESTACADO_ASTERISCO']('caja_simple borde_rosa caja_cita_rosa') },
        '_05_2_DESTACADO_COMILLAS_3ro' : function() { bookSpec.p_['_05_2_DESTACADO_COMILLAS']()                                         },
        '_05_3_DESTACADO_ACTIV'        : function() { bookSpec.p_['_05_1_DESTACADO_ASTERISCO']('parrafo_2-3 caja_simple borde_naranja') },
        '_05_3_DESTACADO_ACTIV_3ro'    : function() { bookSpec.p_['_05_1_DESTACADO_ASTERISCO']('parrafo_2-3 caja_simple borde_naranja') },
        '_15_4_TEXTO_PRACTICA_3ro'     : function() { bookSpec.p_['_05_1_DESTACADO_ASTERISCO']('parrafo_2-3 caja_simple borde_naranja') },

        'Practica_4': function() {
            scope.bookContent.nodeAppend('section', 'nota_naranja').nodeAppend('section', 'nota_naranja_contenido');
        },

        '_07_1_TEXTO_MARGINAL': function() {
            bookSpec.p_['modelDoubleBoxOpener']('section', 'nota_naranja', 'section', 'nota_naranja_contenido');
            scope.workingNode.nodeAppend('p', undefined, undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_07_1_TEXTO_MARGINAL_3ro'          : function() { bookSpec.p_['_07_1_TEXTO_MARGINAL']() },
        '_07_2_TEXTO_MARGINAL_IZQUIERDA_3ro': function() { bookSpec.p_['_07_1_TEXTO_MARGINAL']() },
        '_07_3_TEXTO_MARGINAL_DERECHA_3ro'  : function() { bookSpec.p_['_07_1_TEXTO_MARGINAL']() },
        '_15_8_1_TEXTO_MARGINAL_PRACTICA'   : function() { bookSpec.p_['_07_1_TEXTO_MARGINAL']() },

        'Teoria_3': function() {
            scope.bookContent.nodeAppend('section', '_10_5_RECUADRO_CAJA_TERCIADA');
        },

        '_10_3_model': function(className) {
            if (scope.currPageItem.fillColor.name === 'Teoria_3') {
                bookSpec.p_['modelSimpleBoxOpener']('section', '_10_5_RECUADRO_CAJA_TERCIADA');
                scope.workingNode.nodeAppend('p', className, undefined, [scope.currContents]);
                bookSpec.p_['modelBoxCloser']();
            }
            else if (scope.currPageItem.fillColor.name === 'Paper' || scope.currPageItem.fillColor.name === 'BLANCO') {
                if (scope.bookContent.last().className === '_10_5_RECUADRO_CAJA_TERCIADA') {

                }
                bookSpec.p_['modelSimpleBoxOpener']('section');
                scope.workingNode.nodeAppend('p', className, undefined, [scope.currContents]);
                bookSpec.p_['modelBoxCloser']();
            }
        },
        '_10_3_TIT_RECUADRO'          : function() { bookSpec.p_['_10_3_model']('_10_3_TIT_RECUADRO')       },
        '_10_3_TIT_RECUADRO_3ro'      : function() { bookSpec.p_['_10_3_TIT_RECUADRO']()                    },
        '_10_4_SUBTITULO_RECUADRO'    : function() { bookSpec.p_['_10_3_model']('_10_4_SUBTITULO_RECUADRO') },
        '_10_4_SUBTITULO_RECUADRO_3ro': function() { bookSpec.p_['_10_4_SUBTITULO_RECUADRO']()              },

        '_10_2_TEXTOS_GRAFICOS_RECUADROS': function() {
            if (scope.currPageItem.fillColor.name === 'None') {
                if (scope.bookContent.last().className === '_10_5_RECUADRO_CAJA_TERCIADA') {
                    scope.bookContent.last().className = 'nota_azul';
                    scope.workingNode = scope.bookContent.last().nodeAppend('section', 'nota_azul_contenido');
                    scope.workingNode.nodeAppend('p', undefined, undefined, [scope.currContents]);
                }
                else {
                    bookSpec.p_['modelDoubleBoxOpener']('section', 'nota_azul', 'section', 'nota_azul_contenido');
                    scope.workingNode.nodeAppend('p', undefined, undefined, [scope.currContents]);
                    bookSpec.p_['modelBoxCloser']();
                }
            }
            else {
                bookSpec.p_['_10_3_model']('_10_2_TEXTOS_GRAFICOS_RECUADROS');
            }
        },
        '_10_2_TEXTOS_GRAFICOS_RECUADROS_3ro': function() { bookSpec.p_['_10_2_TEXTOS_GRAFICOS_RECUADROS']() },

        '_10_8_TIT_AMPLIA':function() {
            scope.bookContent.nodeAppend('p', 'bocadillo_azul_tit bocadillo_azul_tit_icono_mas', undefined, [scope.currContents]);
        },
        '_10_8_TIT_AMPLIA_3ro': function() { bookSpec.p_['_10_8_TIT_AMPLIA']() },

        '(\u2022 2 )Actividades_fondo': function() {
            scope.bookContent.nodeAppend('section', '_11_ACTIVIDADES_TEORIA');
        },

        'modelBoxOpenerActividadesAndRepaso': function() {
            var isRepaso = scope.currPageItem.parentPage.appliedMaster.name.indexOf('RF-Act Repaso Final') !== -1;
            isRepaso = isRepaso || scope.currPageItem.parentPage.appliedMaster.name.indexOf('RE-Act Repaso Final Evaluaci') !== -1;
            isRepaso = isRepaso || scope.currPageItem.parentPage.appliedMaster.name.indexOf('E-Act Final+Evaluaci') !== -1;
            isRepaso = isRepaso || scope.currPageItem.parentPage.appliedMaster.name.indexOf('DR-Debate_Repaso') !== -1;
            var relevantClassName = isRepaso ? 'columns-by-2 column-border-light-green padding-lr-05 m-top-52' : '_11_ACTIVIDADES_TEORIA';

            if (!scope.isPreviousStyleFromSameTextFrame || !scope.isPreviousStyleRecognized) {
                scope.workingNode = scope.bookContent.nodeAppend('section', relevantClassName);
            }
        },

        '_11_3_1_TEXTO_LECTURA_ACTIVIDADES': function() {
            bookSpec.p_['modelBoxOpenerActividadesAndRepaso']();
            scope.workingNode.nodeAppend('p', '_11_2_TEXTO_ACTIVIDADES', undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_11_3_1_TEXTO_LECTURA_ACTIVIDADES_3ro': function() { bookSpec.p_['_11_3_1_TEXTO_LECTURA_ACTIVIDADES']() },
        '_11_2_1_TEXTO_ACTIVIDAD_SNUM'         : function() { bookSpec.p_['_11_3_1_TEXTO_LECTURA_ACTIVIDADES']() },
        '_11_2_1_TEXTO_ACTIVIDAD_SNUM_3ro'     : function() { bookSpec.p_['_11_3_1_TEXTO_LECTURA_ACTIVIDADES']() },

        '_11_2_TEXTO_ACTIVIDADES': function() {
            scope.currContents = scope.currContents.trim();
            var splitCurrCont = scope.currContents.split('	');
            var num = splitCurrCont[0].trim();
            if (isNaN(num)) {
                bookSpec.p_['_11_3_1_TEXTO_LECTURA_ACTIVIDADES']();
            }
            else {
                var cont = splitCurrCont.slice(1).join('	').trim();
                bookSpec.p_['modelBoxOpenerActividadesAndRepaso']();
                var actividadesNode = scope.workingNode.nodeAppend('p', '_11_2_TEXTO_ACTIVIDADES');
                actividadesNode.nodeAppend('span', undefined, undefined, [num]);
                actividadesNode.contents.push(' ' + cont);
                bookSpec.p_['modelBoxCloser']();
            }
        },
        '_11_2_TEXTO_ACTIVIDADES_3ro'            : function() { bookSpec.p_['_11_2_TEXTO_ACTIVIDADES']()             },
        '_11_2BIS_TEXTO_ACTIVIDADES_BANDERA'     : function() { bookSpec.p_['_11_2_TEXTO_ACTIVIDADES']()             },
        '_11_2_2_TEXTO_ACTIVIDADES_1ra_LINEA'    : function() { bookSpec.p_['_11_2_TEXTO_ACTIVIDADES']()             },
        '_11_2_2_TEXTO_ACTIVIDADES_1ra_LINEA_3ro': function() { bookSpec.p_['_11_2_2_TEXTO_ACTIVIDADES_1ra_LINEA']() },

        'modelBoxOpenerActividadesResueltas': function(tag1, className1, tag2, className2) {
            if (!scope.isPreviousStyleFromSameTextFrame || !scope.isPreviousStyleRecognized) {
                var actividadesResueltasBox = scope.bookContent.nodeAppend('section', 'actividad_resuelta')
                    .nodeAppend('section', 'actividad_resuelta_contenido');

                actividadesResueltasBox.nodeAppend('section', 'actividad_resuelta_enunciado')
                    .nodeAppend('section', 'actividad_resuelta_enunciado_contenido');

                scope.workingNode = actividadesResueltasBox.nodeAppend('section', 'actividad_resuelta_solucion')
                    .nodeAppend('section', 'actividad_resuelta_solucion_contenido');
                return true;
            }
            return false;
        },

        '_11_4_1_1_TEXTO_ACT_RESUELTA_1RA_LINEA_SNUM_3ro': function() {
            bookSpec.p_['modelBoxOpenerActividadesResueltas']();
            scope.workingNode.nodeAppend('p', undefined, undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_11_4_1_TEXTO_ACTIVIDAD_RESUELTA_1RA_LINEA_3ro': function() { bookSpec.p_['_11_4_1_1_TEXTO_ACT_RESUELTA_1RA_LINEA_SNUM_3ro']() },

        'modelLetras': function(tag, className) {
            if (scope.previousStyle !== scope.style) {
                scope.workingNode = scope.workingNode.nodeAppend(tag, className);
            }
            scope.workingNode.nodeAppend('li').nodeAppend('span', undefined, undefined, [scope.currContents]);
            if (scope.nextStyle !== scope.style && (scope.workingNode.tag === 'ul' || scope.workingNode.tag === 'ol')) {
                scope.workingNode = scope.workingNode.parent;
            }
        },

        '_11_3_TEXTO_LETRAS_ACTIVIDADES': function() {
            bookSpec.p_['modelBoxOpenerActividadesAndRepaso']();
            bookSpec.p_['modelLetras']('ol', 'order-by-letters');
            bookSpec.p_['modelBoxCloser']();
        },
        '_11_3BIS_TEXTO_LETRAS_ACTIVIDADES_BANDERA': function() { bookSpec.p_['_11_3_TEXTO_LETRAS_ACTIVIDADES']() },
        '_11_3_TEXTO_LETRAS_ACTIVIDADES_3ro'       : function() { bookSpec.p_['_11_3_TEXTO_LETRAS_ACTIVIDADES']() },

        '_11_3_0_TEXTO_BOLOS_SINSANGRIA_ACTIVIDADES_3ro': function() {
            bookSpec.p_['modelBoxOpenerActividadesAndRepaso']();
            bookSpec.p_['_04_2_CUERPO_LIBRO_GENERAL_BOLOS']('ul', 'lista_bullets_verde');
            bookSpec.p_['modelBoxCloser']();
        },
        '_11_3_2_TEXTO_BOLOS_ACTIVIDADES'    : function() { bookSpec.p_['_11_3_0_TEXTO_BOLOS_SINSANGRIA_ACTIVIDADES_3ro']() },
        '_11_3_2_TEXTO_BOLOS_ACTIVIDADES_3ro': function() { bookSpec.p_['_11_3_0_TEXTO_BOLOS_SINSANGRIA_ACTIVIDADES_3ro']() },

        '_20_1_EPIG_01_COLOR': function() { bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']('somoslink_subepigrafe') },

        '_20_2_EPIG_02': function() {
            bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']('somoslink_bocadillo_morado');
            scope.workingNode.nodeAppend('div', 'separador');
        },

        'model_20_': function(processor, args) {
            bookSpec.p_['modelDoubleBoxOpener']('section', 'caja_simple borde_morado', 'section', 'caja_simple_contenido');
            processor.apply(scope.workingNode, args);
            if (bookSpec.p_['modelBoxCloser']()) {
                bookSpec.caches._20_num = 1;
            }
        },

        '_20_4_TEXTO_TRIMESTRAL': function() { bookSpec.p_['model_20_'](bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']) },

        '_20_3_EPIG_03': function() {
            scope.currContents = '<span>' + bookSpec.caches._20_num + '</span> ' + scope.currContents.trim();
            bookSpec.caches._20_num++;
            bookSpec.p_['model_20_'](bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL'], ['caja_simple_titulo_morado']);
        },

        '_20_4_1_TEXTO_TRIMESTRAL_BOLOS': function() { bookSpec.p_['model_20_'](bookSpec.p_['_04_2_CUERPO_LIBRO_GENERAL_BOLOS'], ['ul', 'lista_bullets_morado']) },

        '_05_2_DESTACADO_COMILLAS_BANDERA': function(className) {
            bookSpec.p_['modelDoubleBoxOpener']('section', 'caja_simple borde_rosa caja_cita_rosa', 'section', 'caja_simple_contenido');
            scope.workingNode.nodeAppend('p', className, undefined, [scope.currContents]);
            bookSpec.p_['modelBoxCloser']();
        },
        '_05_2_DESTACADO_COMILLAS_BANDERA_3ro': function() { bookSpec.p_['_05_2_DESTACADO_COMILLAS_BANDERA']()                            },
        '_20_7_TIT_DESTACADO_TRIMETRAL'       : function() { bookSpec.p_['_05_2_DESTACADO_COMILLAS_BANDERA']('caja_simple_titulo_morado') },

        '_04_5_1_TEXTO_ANEXO_3ro'     : function() { bookSpec.p_['_04_1_CUERPO_LIBRO_GENERAL']()                                 },
        '_04_5_2_TEXTO_ANEXO_BOLO_3ro': function() { bookSpec.p_['_04_2_CUERPO_LIBRO_GENERAL_BOLOS']('ul', 'lista_bullets_azul') },

    },

    
    tableStyles: function (fill_color_name)
    {
        var f_cell_tag    = null;
        var f_table_class = null;
        
        /* ejemplo de bachillerato
        switch (fill_color_name)
        {
            case "TABLA_AZUL_ENCABEZADO-2":
            {
                f_cell_tag    = 'th';
                f_table_class = 'tabla_azul_rosa';
                
                break;
            }                
        }
        */
        
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

        scope.bold1           = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_NEGRITA');

        scope.bold1_3ro       = getCharacterStyleIfUsed('_04_CUERPO_LIBRO_3ro',         '_04_NEGRITA_3ro');

        scope.bold2           = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_1_DESTACADO_ASTERISCO_NEGRITA');

        scope.bold2_3ro       = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_1_DESTACADO_ASTERISCO_NEGRITA_3ro');

        scope.bold3           = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_2_DESTACADO_COMILLAS_NEGRITA');

        scope.bold3_3ro       = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_2_DESTACADO_COMILLAS_NEGRITA_3ro');

        scope.bold4           = getCharacterStyleIfUsed('_07_MARGINALES',               '_07_1_TEXTO_MARGINAL_NEGRITA');

        scope.bold4_3ro       = getCharacterStyleIfUsed('_07_MARGINALES_3ro',           '_07_1_TEXTO_MARGINAL_NEGRITA_3ro');

        scope.bold5           = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS',     '_10_2_TEXTO_NEGRITA');

        scope.bold5_3ro       = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS_3ro', '_10_2_TEXTO_NEGRITA_3ro');

        scope.bold6           = getCharacterStyleIfUsed('_11_ACTIVIDADES',              '_11_TEXTO_ACTIVIDADES_NEGRITA');

        scope.bold6_3ro       = getCharacterStyleIfUsed('_11_ACTIVIDADES_3ro',          '_11_TEXTO_ACTIVIDADES_NEGRITA_3ro');

        scope.bold7           = getCharacterStyleIfUsed('_15_PRACTICA',                 '_15_4_TEXTO_NEGRITA');

        scope.bold7_3ro       = getCharacterStyleIfUsed('_15_PRACTICA_3ro',             '_15_4_TEXTO_NEGRITA_3ro');

        scope.bold8           = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_5_ANEXO_NEGRITA');

        scope.italic1         = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_CURSIVA');

        scope.italic1_3ro     = getCharacterStyleIfUsed('_04_CUERPO_LIBRO_3ro',         '_04_CURSIVA_3ro');

        scope.italic2         = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_1_DESTACADO_ASTERISCO_CURSIVA');

        scope.italic2_3ro     = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_1_DESTACADO_ASTERISCO_CURSIVA_3ro');

        scope.italic3         = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_2_DESTACADO_COMILLAS_CURSIVA');

        scope.italic3_3ro     = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_2_DESTACADO_COMILLAS_CURSIVA_3ro');

        scope.italic4         = getCharacterStyleIfUsed('_07_MARGINALES',               '_07_1_TEXTO_MARGINAL_CURSIVA');

        scope.italic4_3ro     = getCharacterStyleIfUsed('_07_MARGINALES_3ro',           '_07_1_TEXTO_MARGINAL_CURSIVA_3ro');

        scope.italic5         = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS',     '_10_2_TEXTO_CURSIVA');

        scope.italic5_3ro     = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS_3ro', '_10_2_TEXTO_CURSIVA_3ro');

        scope.italic6         = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS',     '_10_4_SUBTIT_BLANCO_CURSIVA');

        scope.italic6_3ro     = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS_3ro', '_10_4_SUBTIT_BLANCO_CURSIVA_3ro');

        scope.italic7         = getCharacterStyleIfUsed('_11_ACTIVIDADES',              '_11_TEXTO_ACTIVIDADES_CURSIVA');

        scope.italic7_3ro     = getCharacterStyleIfUsed('_11_ACTIVIDADES_3ro',          '_11_TEXTO_ACTIVIDADES_CURSIVA_3ro');

        scope.italic8         = getCharacterStyleIfUsed('_15_PRACTICA',                 '_15_4_TEXTO_CURSIVA');

        scope.italic8_3ro     = getCharacterStyleIfUsed('_15_PRACTICA_3ro',             '_15_4_TEXTO_CURSIVA_3ro');

        scope.italic9         = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_5_ANEXO_CURSIVA');

        scope.boldItalic1     = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_NEGRITA_CURSIVA');

        scope.boldItalic1_3ro = getCharacterStyleIfUsed('_04_CUERPO_LIBRO_3ro',         '_04_NEGRITA_CURSIVA_3ro');

        scope.boldItalic2     = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_1_DESTACADO_ASTERISCO_NEGRITA_CURSIVA');

        scope.boldItalic2_3ro = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_1_DESTACADO_ASTERISCO_NEGRITA_CURSIVA_3ro');

        scope.boldItalic3     = getCharacterStyleIfUsed('_05_DESTACADOS',               '_05_2_DESTACADO_COMILLAS_NEGRITA_CURSIVA');

        scope.boldItalic3_3ro = getCharacterStyleIfUsed('_05_DESTACADOS_3ro',           '_05_2_DESTACADO_COMILLAS_NEGRITA_CURSIVA_3ro');

        scope.boldItalic4     = getCharacterStyleIfUsed('_07_MARGINALES',               '_07_1_TEXTO_MARGINAL_NEGRITA_CURSIVA');

        scope.boldItalic4_3ro = getCharacterStyleIfUsed('_07_MARGINALES_3ro',           '_07_1_TEXTO_MARGINAL_NEGRITA_CURSIVA_3ro');

        scope.boldItalic5     = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS',     '_10_2_TEXTO_NEGRITA_CURSIVA');

        scope.boldItalic5_3ro = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS_3ro', '_10_2_TEXTO_NEGRITA_CURSIVA_3ro');

        scope.boldItalic6     = getCharacterStyleIfUsed('_11_ACTIVIDADES',              '_11_TEXTO_ACTIVIDADES_CURSIVA_NEGRITA');

        scope.boldItalic6_3ro = getCharacterStyleIfUsed('_11_ACTIVIDADES_3ro',          '_11_TEXTO_ACTIVIDADES_CURSIVA_NEGRITA_3ro');

        scope.boldItalic7     = getCharacterStyleIfUsed('_15_PRACTICA',                 '_15_4_TEXTO_NEGRITA_CURSIVA');

        scope.boldItalic7_3ro = getCharacterStyleIfUsed('_15_PRACTICA_3ro',             '_15_4_TEXTO_NEGRITA_CURSIVA_3ro');

        scope.boldItalic8     = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_5_ANEXO_NEGRITA_CURSIVA');

        scope.destacado1      = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS',     '_10_3_TEXTO_DESTACADO');

        scope.destacado1_3ro  = getCharacterStyleIfUsed('_10_GRAFICOS_Y_RECUADROS_3ro', '_10_3_TEXTO_DESTACADO_3ro');

        scope.destacado2      = getCharacterStyleIfUsed('_11_ACTIVIDADES',              '_11_LETRA_ACTIVIDADES');

        scope.destacado2_3ro  = getCharacterStyleIfUsed('_11_ACTIVIDADES_3ro',          '_11_LETRA_ACTIVIDADES_3ro');

        scope.destacado3      = getCharacterStyleIfUsed('_04_CUERPO_LIBRO',             '_04_ASTERISCO');

        scope.destacado4      = getCharacterStyleIfUsed('_20_TRIMESTRALES',             '_21_frutiger57cond_color');
    },

    applyInlineChanges: function(paragraph)
    {
        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold1,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold1_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold2,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold2_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold3,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold3_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold4,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold4_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold5,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold5_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold6,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold6_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold7,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold7_3ro,               '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.bold8,                   '<strong>',                '</strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic1,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic1_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic2,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic2_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic3,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic3_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic4,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic4_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic5,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic5_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic6,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic6_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic7,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic7_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic8,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic8_3ro,             '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.italic9,                 '<i>',                     '</i>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic1,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic1_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic2,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic2_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic3,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic3_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic4,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic4_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic5,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic5_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic6,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic6_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic7,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic7_3ro,         '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.boldItalic8,             '<strong><i>',             '</i></strong>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado1,              '<span class=tipo_azul>',  '</span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado1_3ro,          '<span class=tipo_azul>',  '</span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado2,              '<span class=tipo_verde>', '</span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado2_3ro,          '<span class=tipo_verde>', '</span>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado3,              '<sup><span class=tipo_naranja>', '</span></sup>');

        changeGrepInlineTags(paragraph, 'appliedCharacterStyle', scope.destacado4,              '<sup><span class=tipo_morado>', '</span></sup>');
    },

    isContent:
    {
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul', 'ol', 'multimedia', 'table'],
        classes: ['separador', 'caja_azul_flecha', '_11_1_TITULO']
    },

    isTitle:
    {
        tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'ul'],
        classes: ['columns-by-2 column-border-light-green padding-lr-05 m-top-52', '_11_ACTIVIDADES_TEORIA']
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
            mClass0_0: 'header-bar hb-blue'
        };
        scope.html.declarativeAppend(body);
        scope.bookContent = scope.html.last().nodeAppend('div', 'book-content-width book-content-bg-color-white');
    },

    afterContentCreation: function()
    {

    },

    afterReorderByDeepness: function()
    {
        function implodeNestedDuplicates(parentNode, treatedClassName, implodedClassName) {
            for (var i = 0, bcl = parentNode.contents.length; i < bcl; i++) {
                if (parentNode.get(i) instanceof Node && parentNode.get(i).hasClass(treatedClassName)) {
                    for (var j = 0; j < parentNode.get(i).contents.length; j++) {
                        if (parentNode.get(i).get(j) instanceof Node && parentNode.get(i).get(j).hasClass(implodedClassName)) {
                            parentNode.get(i).get(j).implode();
                            j--;
                        }
                    }
                }
            }
        }

        implodeNestedDuplicates(scope.bookContent, '_11_ACTIVIDADES_TEORIA', '_11_ACTIVIDADES_TEORIA');
        implodeNestedDuplicates(scope.bookContent, '_11_ACTIVIDADES_TEORIA', 'columns-by-2 column-border-light-green padding-lr-05 m-top-52');
    },

    afterReorderByPosition: function()
    {
        scope.bookContent.concatenateSuccessiveByClassName('_11_ACTIVIDADES_TEORIA');
        scope.bookContent.concatenateSuccessiveByClassName('columns-by-2 column-border-light-green padding-lr-05 m-top-52');

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

        for (var i = 0, bcl = scope.bookContent.contents.length; i < bcl; i++) {
            if (scope.bookContent.get(i) instanceof Node && scope.bookContent.get(i).hasClass('_11_ACTIVIDADES_TEORIA')) {
                scope.bookContent.get(i).interposeNode('section', '_11_2_TEXTO');
                scope.bookContent.get(i).nodePrepend('section', '_11_1_TITULO').nodeAppend('p', '_11_1_TITULO_ACTIVIDADES', undefined, ['ACTIVIDADES']);
            }
        }
    }

};