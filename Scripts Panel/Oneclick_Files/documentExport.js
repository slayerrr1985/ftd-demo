var scope = {};

function baseExport ()
{

    //function setTableWidthClass (table_node, table_width)
    //{
    //    var sample_page  = app.activeDocument.pages[0];
    //    var pageW        = pageWidthWithMargins (sample_page);
    //    var columnW      = columnWidth          (sample_page);
    //    var columnGutter = sample_page.marginPreferences.columnGutter;
    //
    //    if      (table_width > pageW * 0.9)                       table_node.addClass  ('parrafo_completo');
    //    else if (table_width > (columnW *2 + columnGutter) * 0.9) table_node.addClass  ('parrafo_2-3');
    //    //else                                                      table_node.newParent ('aside');
    //}


    function checkCellStyle (applied_cell_style, fill_color)
    {
        var cell_style         = "";
        var result             = {};
        result.cell_tag        = 'td';
        result.cell_class      = undefined;
        result.cell_attributes = undefined;
        result.table_class     = undefined;

//if (applied_cell_style.hasOwnProperty ('name')) $.writeln ("applied_cell_style: " + applied_cell_style.name);
        
        if (applied_cell_style.hasOwnProperty ('appliedParagraphStyle'))
        {
            if (applied_cell_style.appliedParagraphStyle.hasOwnProperty ('justification'))
            {
                var justification = applied_cell_style.appliedParagraphStyle.justification;
//$.writeln (applied_cell_style.appliedParagraphStyle.justification);
                if      ((justification == Justification.LEFT_ALIGN)  || (justification == Justification.LEFT_JUSTIFIED))  cell_style = "text-align:left !important;";
                else if ((justification == Justification.RIGHT_ALIGN) || (justification == Justification.RIGHT_JUSTIFIED)) cell_style = "text-align:right !important;";
                else                                                                                                       cell_style = "text-align:center !important;";
            }
        }


        if (fill_color.hasOwnProperty ('name'))
        {
//$.writeln ("fill_color: " + fill_color.name);
            if (fill_color.hasOwnProperty ("colorValue"))
            {
                var color_value = fill_color.properties.colorValue;
               
                if (color_value.length == 4) // CMYK
                {
                    var color   = app.documents[0].colors.add ({ space:ColorSpace.CMYK, colorValue:color_value });  
                    color.space = ColorSpace.RGB;  
                    color_value = color.colorValue;
                    color.remove ();
                }
    
                for (var c=0, max=color_value.length; c<max; c++)
                {
                    var comp = Math.round (color_value[c]);
                    if (comp > 255) comp = 255;                    
                }
                                
                color_value = "#" + ((1 << 24) + (color_value[0] << 16) + (color_value[1] << 8) + color_value[2]).toString(16).slice(1);
                
                if (cell_style.length > 0) cell_style += " ";
                cell_style += "background-color:" + color_value + " !important;";
            }
            else
            {
                if (cell_style.length > 0) cell_style += " ";
                cell_style += "background-color:transparent !important;";
            }

            // Los estilos en línea previos:
            result.cell_attributes = { style:cell_style };
            
            
            var table_cell_styles = bookSpec.tableStyles (fill_color.name);            
            if (table_cell_styles.cell_tag    != null) result.cell_tag    = table_cell_styles.cell_tag;
            if (table_cell_styles.table_class != null) result.table_class = table_cell_styles.table_class;
        }

        return result;
    }

    bookSpec.specialCharsDictionaries.__proto__ = null;
    for (fontName in bookSpec.specialCharsDictionaries) {
        bookSpec.specialCharsDictionaries[fontName].__proto__ = null;
        }

    bookSpec.inlineStylesVars();
    

    function replaceInlineContents(paragraph)
    {
var image_fail_debug = false;        
/*if ((paragraph.parent.id == 300426) && paragraph.hasOwnProperty ("contents") && (paragraph.contents.indexOf ("Por ejemplo, ") == 0)) image_fail_debug = true;
if (image_fail_debug) $.writeln (paragraph.contents);*/
    
        if ((paragraph != null) && paragraph.isValid)
        {        
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
            app.findTextPreferences.findWhat = '<';
            app.changeTextPreferences.changeTo = '&#60;';
            paragraph.changeText();
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
        }

        if ((paragraph != null) && paragraph.isValid)
        {
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
            app.findTextPreferences.findWhat = '>';
            app.changeTextPreferences.changeTo = '&#62;';
            paragraph.changeText();
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
        }

if (image_fail_debug) $.writeln (paragraph.contents);

        if ((paragraph != null) && paragraph.isValid) changeGrepInlineTags(paragraph, 'position', Position.SUPERSCRIPT,    '<sup>', '</sup>');
            
        if ((paragraph != null) && paragraph.isValid) changeGrepInlineTags(paragraph, 'position', Position.OT_SUPERSCRIPT, '<sup>', '</sup>');
            
        if ((paragraph != null) && paragraph.isValid) changeGrepInlineTags(paragraph, 'position', Position.SUBSCRIPT,      '<sub>', '</sub>');
            
        if ((paragraph != null) && paragraph.isValid) changeGrepInlineTags(paragraph, 'position', Position.OT_SUBSCRIPT,   '<sub>', '</sub>');
            
        if ((paragraph != null) && paragraph.isValid) bookSpec.applyInlineChanges(paragraph);

if (image_fail_debug) $.writeln (paragraph.contents);

        if ((paragraph != null) && paragraph.isValid) 
        {
            app.findGrepPreferences   = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            app.findGrepPreferences.fontStyle = 'Bold';
            app.findGrepPreferences.findWhat = '([^\n\r<]*>)?(.*)(<[^\n\r>]*)(?!.*>)|([^\n\r<]*>)?(.+)';
            app.changeGrepPreferences.changeTo = '$1$4' + '<strong>' + '$2$5' + '</strong>' + '$3';
            paragraph.changeGrep();
            app.findGrepPreferences   = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
        }

        if ((paragraph != null) && paragraph.isValid) 
        {
            app.findGrepPreferences   = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
            app.findGrepPreferences.fontStyle = 'Italic';
            app.findGrepPreferences.findWhat = '([^\n\r<]*>)?(.*)(<[^\n\r>]*)(?!.*>)|([^\n\r<]*>)?(.+)';
            app.changeGrepPreferences.changeTo = '$1$4' + '<i>' + '$2$5' + '</i>' + '$3';
            paragraph.changeGrep();
            app.findGrepPreferences   = NothingEnum.nothing;
            app.changeGrepPreferences = NothingEnum.nothing;
        }

        if ((paragraph != null) && paragraph.isValid) 
        {
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
            app.findTextPreferences.capitalization = Capitalization.SMALL_CAPS;
            var found = paragraph.findText();
            for (var z = 0, fl = found.length; z<fl; z++)
            {
                if (typeof found[z].contents === 'string') found[z].contents = found[z].contents.toUpperCase();
            }
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
        }

        if ((paragraph != null) && paragraph.isValid) 
        {
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
            app.findTextPreferences.capitalization = Capitalization.ALL_CAPS;
            var found = paragraph.findText();
            for (var z = 0, fl = found.length; z<fl; z++)
            {
                if (typeof found[z].contents === 'string') found[z].contents = found[z].contents.toUpperCase();
            }
            app.findTextPreferences = NothingEnum.nothing;
            app.changeTextPreferences = NothingEnum.nothing;
        }

if (image_fail_debug) $.writeln (paragraph.contents);

        if ((paragraph != null) && paragraph.isValid) 
        {
            for (fontName in bookSpec.specialCharsDictionaries)
            {
                app.findTextPreferences = NothingEnum.nothing;
                app.changeTextPreferences = NothingEnum.nothing;
                app.findTextPreferences.appliedFont = fontName;
                if (paragraph.isValid)
                {
                    var found = paragraph.findText();
                    var dictionary = bookSpec.specialCharsDictionaries[fontName];
                    for (var z = 0, fl = found.length; z < fl; z++)
                    {
                        if (found[z].contents in dictionary)
                        {
                            found[z].contents = dictionary[found[z].contents];
                        }
                    }
                }
                app.findTextPreferences = NothingEnum.nothing;
                app.changeTextPreferences = NothingEnum.nothing;
            }
        }

if (image_fail_debug) $.writeln (paragraph.contents);

        if ((paragraph != null) && paragraph.isValid) 
        {
            // Imágenes ancladas
            var paraItems = paragraph.allPageItems;        
            
if (image_fail_debug) $.writeln ("paraItems: " + paraItems.length);            
            
            while (paraItems.length > 0)
            {
                if (paraItems[0].isValid && paraItems[0].hasOwnProperty ('anchoredObjectSettings'))
                {
                    if (paraItems[0].parent instanceof Character)
                    {
                        if ((paraItems[0].allGraphics[0]) || (paraItems[0] instanceof Polygon))
                        {
                            paraItems[0].parent.parent.insertionPoints.item (paraItems[0].parent.index).contents = exportImageByPageItemID (paraItems[0].id).trim ();                            
                            paraItems[0].remove ();
                        }
                    }
                }
                
                paraItems.shift ();
            }

            if (paragraph instanceof Cell)
            {
                paragraph.autoGrow = true;
                //paragraph.height   = 50; // He visto que en algunos casos si la haces más alta se pierde la tabla y falla, por eso, sólo cambio el ancho

                //paragraph.width = 400; // Fallaba en algunos si no se incluye la unidad
                paragraph.width = "400pt";
            }   
        }
    }
    
    function NodeWithExtras (parent, tag, className, properties, contents)
    { 
        this.parent = parent;
        this.tag = tag;
        this.className = className || undefined;
        this.properties = properties || {};
        this.contents = contents || [];
        
        this.style = scope.style;
        this.currPageIndex = scope.currPageIndex;
        this.currPageItemIndex = scope.currPageItemIndex;
        this.currParagraphIndex = scope.currParagraphIndex;
        this.currPageItemVisibleBounds = currPageItemVisibleBounds;
        this.currPageItemZIndex = scope.currPageItemZIndex;
        this.currBaseline = currBaseline;
        
        //if (currPageItemVisibleBounds !== undefined && scope.currPageItemZIndex !== undefined && currPageItemVisibleBounds.toString !== undefined) {
        //    this.properties.currPageItemVisibleBounds = currPageItemVisibleBounds.toString();
        //    this.properties.currPageItemZIndex = '' + scope.currPageItemZIndex;
        //}

        this.node = function(tag, className, properties, contents) {
            return new NodeWithExtras(this, tag, className, properties, contents);
        }        
    }
    
    
    NodeWithExtras.prototype = new Node ();
    
    
    NodeWithExtras.prototype.isContent = function()
    {
        var tags = bookSpec.isContent.tags;
        var classes = bookSpec.isContent.classes;
        return (tags.indexOf(this.tag) !== -1 || classes.indexOf(this.className) !== -1);
    }

    NodeWithExtras.prototype.isTitle = function ()
    {
        var tags = bookSpec.isTitle.tags;
        var classes = bookSpec.isTitle.classes;
        return (tags.indexOf(this.tag) !== -1 || classes.indexOf(this.className) !== -1);
    } 
    
    NodeWithExtras.prototype.isText = function ()
    {
        var tags = bookSpec.isText.tags;
        var classes = bookSpec.isText.classes;
        return (tags.indexOf(this.tag) !== -1 || classes.indexOf(this.className) !== -1);
    }

    scope.NodeWithExtras = NodeWithExtras;


    
    var tables_exported = [];

    function getTableHTML (table)
    {    
        if (tables_exported.indexOf (table.id) == -1) tables_exported.push (table.id);
        else                                          return;

        var table_bounds        = getTableBounds (table);
        var page_graphics       = table.parent.parentPage.allGraphics;
        var over_table_graphics = [];

        // Obtener imágnes "sueltas" sobre la tabla.
        for (var pg=0, max=page_graphics.length; pg<max; pg++)
        {
            if (page_graphics[pg].isValid && isInsideWithVBounds (page_graphics[pg].visibleBounds, table_bounds, 0.9))
            {
                if (!(page_graphics[pg].parent.parent instanceof Character)) over_table_graphics.push (page_graphics[pg]);
            }
        }
        
        var over_table_graphics_len = over_table_graphics.length;

        // Colocar en orden de lectura (arriba a abajo / izquierda a derecha)
        if (over_table_graphics_len > 0)
        {
            over_table_graphics.sort (function(a, b)
            { 
                if (Math.abs (a.geometricBounds[0] - b.geometricBounds[0]) < 1) return a.geometricBounds[1] - b.geometricBounds[1];
                else                                                            return a.geometricBounds[0] - b.geometricBounds[0];
            });
        }

        // Generar tabla
        var table_node         = scope.workingNode.node ('table').append ();
        //setTableWidthClass (table_node, table.width);
        var table_class_setted = false;

        table_node.currPageItemVisibleBounds = table_bounds;

        var table_grid = [];
        //for (var t=0, max=table.rows.length; t<max; t++) table_grid[t] = '\n    <tr>';        
        for (var t=0, max=table.rows.length; t<max; t++) table_grid[t] = table_node.node ('tr').append ();
        

        for (var table_cells=table.cells, c=0, cMax=table_cells.length; c<cMax; c++)
        {
            var current_undo_cell = getUndoHistoryLength ();

$.writeln ("STA");            
$.writeln (c);
$.writeln (table_cells[c]);
$.writeln ("END 1");
            app.doScript (replaceInlineContents, ScriptLanguage.JAVASCRIPT, table_cells[c], UndoModes.FAST_ENTIRE_SCRIPT, 'Grep ops');
$.writeln ("END 2");            
            var content = table_cells[c].contents.replace (/(\n|\r)/g, "<br/>");
            
            if (app.activeDocument.undoHistory.length) if (app.activeDocument.undoHistory[0] == 'Grep ops') app.activeDocument.undo();
            undoToLength (current_undo_cell);

            if (over_table_graphics_len > 0)
            {
                var cell_bounds = getCellBounds (table_cells[c]);
                for (var o=0; o<over_table_graphics_len; o++)
                {
                    if (isInsideWithVBounds (over_table_graphics[o].visibleBounds, cell_bounds, 0.9))
                    {
                        content += exportImageByPageItemID (over_table_graphics[o].id);//.trim ();
                        
                        over_table_graphics.splice (o, 1);
                        over_table_graphics_len = over_table_graphics.length;                        
                    }
                }
            }

            var cell_node_data = checkCellStyle (table_cells[c].appliedCellStyle, table_cells[c].fillColor);
            var rowspan        = table_cells[c].rowSpan;
            var colspan        = table_cells[c].columnSpan;

            if ((cell_node_data.cell_attributes === undefined) && ((table_cells[c].rowSpan > 1) || (table_cells[c].columnSpan > 1))) cell_node_data.cell_attributes = {};
            if (rowspan > 1) cell_node_data.cell_attributes["rowspan"] = "" + rowspan;
            if (colspan > 1) cell_node_data.cell_attributes["colspan"] = "" + colspan;            

            if (!table_class_setted && (cell_node_data.table_class !== undefined))
            {
                table_class_setted   = true;
                table_node.addClass (cell_node_data.table_class);
            }
            
            if ((table_cells[c].width > 0) && (table_cells[c].height > 0) && (rowspan > 0) && (colspan > 0))
            {
                table_grid[table_cells[c].parentRow.index].node (cell_node_data.cell_tag, cell_node_data.cell_class, cell_node_data.cell_attributes, [content]).append ();
            }
        }
                 

//if (++numtable == 7) exit();

        //------------------------------------------------------------------------------------------------
/*
        // Exportar parte de las imágenes de la tabla (las que no encuentre se hacen luego):
        var exported_images = new Array ();  
        if (table.allPageItems.length > 0)
        {
            var table_items = table.allPageItems;
            
            for (var i=0, iMax=table_items.length; i<iMax; i++)
            {
                if (table_items[0].isValid && (table_items[0].allGraphics.length > 0))
                {
                    var table_imgs = table_items[0].allGraphics;
                    
                    for (var g=0, gMax=table_imgs.length; g<gMax; g++)
                    {
                        if (table_imgs[g].isValid)
                        {
                            var exported_code = exportImageByPageItemID (table_imgs[g].id);
                            var exported_img  = exported_code.split ('"')[1].split ('/');
                            exported_img      = exported_img[exported_img.length - 1];
                            exported_img      = exported_img.substr (0, exported_img.lastIndexOf ('.') + 1);
                            
                            if (exported_images.indexOf (exported_code) == -1) exported_images.push ({ html_image_code:exported_code, image_filename:exported_img });
                        }
                    }
                }
            }
        }

//$.writeln ("-------------------------- next 2");        

        var exported_images_len = exported_images.length;       

        // Exportacíon a fichero de selección:
        var html_export_preferences = app.activeDocument.htmlExportPreferences;
        html_export_preferences.bulletExportOption = BulletListExportOption.UNORDERED_LIST;
       // html_export_preferences.cssExportOption = 'none';
        html_export_preferences.exportOrder = ExportOrder.LAYOUT_ORDER;
        html_export_preferences.exportSelection          = true;
        //html_export_preferences.includeCSSDefinition     = false;
        html_export_preferences.numberedListExportOption = NumberedListExportOption.ORDERED_LIST;
        html_export_preferences.preserveLayoutAppearence = true;
        html_export_preferences.viewDocumentAfterExport  = false;

        var hash       = getSafeTimeHash ();
        var table_file = new File (export_folder + hash + ".html");

        table.select (SelectionOptions.REPLACE_WITH);       
        app.activeDocument.exportFile (ExportFormat.HTML, table_file);
        app.activeDocument.select (NothingEnum.NOTHING);

        // Leer fichero html y obtener sólo la parte de la tablas.
        var found       = false;
        var table_lines = "";
        
        table_file.open ('r');
//$.writeln ("-------------------------- next 3");        

        while (!table_file.eof)
        {
            var line = table_file.readln ().replace (/^\s+|\s+$/gm,'');

            if (!found) 
            {
                if (line.indexOf ("<table") == 0)
                {
                    found        = true;
                    table_lines += line;
                }
            }
            else
            {
                table_lines += line;
                if (line.indexOf ("</table>") == 0) break;
            }
        }        

        table_file.close ();

        // Borrar el fichero html
        table_file.remove ();
//$.writeln ("-------------------------- next 4");        

        // Borrar, si se generó, la carpeta de recursos.
        var root  = Folder (export_folder);
        var files = root.getFiles (hash+"*");
        if (files && files.length > 0) for (var f=0, fMax=files.length; f<fMax; f++) removeFolder (files[f].fsName);    

        table_lines = table_lines.replace (/>/g, '>\n').replace (/</g, '\n<').replace (/\n\n/g, '\n');
        table_lines = table_lines.split   ("\n");
        table_lines.splice (0, 1);

        var level     = 0;
        var dom       = dommy ();    
        var last_node = null;

        for (var l=0, lMax=table_lines.length; l<lMax; l++)
        {
            var line            = table_lines[l];
            var curr_tag        = undefined;
            var curr_class      = undefined;
            var curr_attributes = undefined;

            if (line.indexOf ('<') == 0) // Inicio o fin de etiqueta
            {
                if (line.indexOf ('</') != -1) // Fin de etiqueta
                {
                    level--;
                    last_node = last_node.parent;
                }
                else // Inicio de etiqueta                      
                {
                    level++;

                    var first_space = line.indexOf (' ');
                    if (first_space != -1)
                    {
                        curr_tag = line.substr (1, first_space - 1);                                      
                        
                        // Si es una imágen sustituir el código por el generado al exportar:
                        if (curr_tag == "img")
                        {
                            var found = -1;
                            
                            if (exported_images_len > 0)
                            {
                                for (var f=0; f<exported_images_len; f++)
                                {
                                    if (line.indexOf (exported_images[f].image_filename) != -1)
                                    {
                                        found = f;
                                        break;
                                    }
                                }
                            }
                            
                            if (found != -1) line = exported_images[found].html_image_code;
                            else
                            {
//$.writeln ("-------------------------- next 5");                         
                                //var item_id = line.substr         (line.indexOf ('src'));
                                //item_id     = item_id.substr      (item_id.indexOf ('"') + 1);
                                //item_id     = item_id.substr      (0, item_id.lastIndexOf ('.'));
                                //var pos     = item_id.lastIndexOf ('/');
                                //if (pos != -1) item_id = item_id.substr (pos + 1);
                               
                                //var exported_code = exportImageByPageItemID (parseInt (item_id));
                                
                                //line = exported_code;
//$.writeln ("-------------------------- next 6");                                                         
                            }
                        }
                        
                        // Obtener atributos y valores
                        var attrs        = line.substr (first_space + 1, ).split ('" ');
                        var attrs_length = attrs.length;
                        curr_attributes  = {};

                        if (attrs[attrs_length - 1].indexOf ('/>') != -1) attrs.pop ();

                        for (var a=0; a<attrs.length; a++)
                        {
                            var attr = attrs[a];

                            if ((attr.length > 0) && (attr.indexOf ('/>') != 0))
                            {                
                                attr      = attr.split ('=');                            
                                var key   = attr[0].replace (/^\s+|\s+$/gm, '');
                                var value = attr[1].replace (/^\s+|\s+$/gm, '').substr (1);
                                if (value.indexOf ('">') != -1) value = value.replace ('">', '');

                                var low_key = key.toLowerCase ();
                                if      (low_key == "class") curr_class           = value;
                                else if (low_key != "id")    curr_attributes[key] = value;
                            }
                        }
                    }
                    else curr_tag = line.substr (1, line.length - 2);

                    if (last_node == null) last_node = dom.node       (curr_tag, curr_class, curr_attributes).append ();
                    else                   last_node = last_node.node (curr_tag, curr_class, curr_attributes).append ();

                    if ((line.indexOf ('/>') + 2) == line.length) // Fin de etiqueta
                    {                    
                        level--;
                        last_node = last_node.parent;
                    }
                }
            }
            else // Contenido
            {
                if (last_node.contents) last_node.contents.push (line);
                else                    last_node.contents = [line];
            }
            
//$.writeln (line);
        }
        */

        //return dom.first ();
    }
    
    
    function reorderNodesByDeepness(node)
    {
        for (var i = 0; i < node.contents.length; i++)
        {
            for (var j = i + 1; j < node.contents.length; j++)
            {
                if (node.get(i) instanceof NodeWithExtras && node.get(j) instanceof NodeWithExtras && node.get(i).currPageIndex === node.get(j).currPageIndex)
                {
                    var top    = node.get(i).currPageItemZIndex < node.get(j).currPageItemZIndex ? node.get(i) : node.get(j);
                    var bottom = node.get(i).currPageItemZIndex >= node.get(j).currPageItemZIndex ? node.get(i) : node.get(j);
                    
                    if (!bottom.isContent() && node.get(i).currPageItemIndex !== node.get(j).currPageItemIndex && isInsideWithVBounds(top.currPageItemVisibleBounds, bottom.currPageItemVisibleBounds, 0.5))
                    {
                        if      (top === node.get(i)) j = i;
                        else if (top === node.get(j)) j--;
                        
                        top.moveTo(bottom).append();
                    }
                }
            }
        }
        
        for (var i = 0; i < node.contents.length; i++)
        { 
            if (node.get(i) instanceof NodeWithExtras && !node.get(i).isContent())
            {
                reorderNodesByDeepness(node.get(i));
            }
        }
    }

    function reorderNodesByPosition (node)
    {
        for (var i = 0; i < node.contents.length; i++)
        {
            if (node.get(i) instanceof NodeWithExtras)
            { 
                node.get(i).topCoordinate = node.get(i).currPageItemVisibleBounds[0];
                node.get(i).rightCoordinate = node.get(i).currPageItemVisibleBounds[1];
                if (node.get(i).isText())
                { 
                    node.get(i).topCoordinate = node.get(i).currBaseline;
                }
            }
        }
        
        
        node.contents = node.contents.mergeSort (function(a, b)
        { 
            if (a instanceof NodeWithExtras && b instanceof NodeWithExtras && (a.currPageIndex === b.currPageIndex)) {
                if (Math.abs(a.topCoordinate - b.topCoordinate) < 1)
                { 
                    return a.rightCoordinate - b.rightCoordinate;
                }
                else
                {
                    return a.topCoordinate - b.topCoordinate;
                }
            }
            
            else return 0;
            
        });
        for (var i = 0; i < node.contents.length; i++)
        { 
            if (node.get(i) instanceof NodeWithExtras && !node.get(i).isContent())
            { 
                reorderNodesByPosition (node.get(i))
            }
        }
    }
    

    function isInsideWithVBounds(vb1, vb2, criteria)
    { 
        return isInside.apply(undefined, vb1.concat(vb2).concat(criteria));
    }
    
    
    //tests if A = ( (x1, y1) , (x2, y2) ) is inside of B = ( (xx1, yy1) , (xx2, yy2) )
    function isInside(y1, x1, y2, x2, yy1, xx1, yy2, xx2, criteria)
    {
        var frac = intersectionFraction(y1, x1, y2, x2, yy1, xx1, yy2, xx2);
        
        return frac > criteria;
    }
    
    
    //tests what fraction of A = ( (x1, y1) , (x2, y2) ) is inside of B = ( (xx1, yy1) , (xx2, yy2) )
    function intersectionFraction(y1, x1, y2, x2, yy1, xx1, yy2, xx2)
    {
        var squareToTestArea = area(y1, x1, y2, x2);
        var intersection = intersectionArea(y1, x1, y2, x2, yy1, xx1, yy2, xx2);
        
        return intersection/squareToTestArea;
    }
    
    
    function intersectionArea(y1, x1, y2, x2, yy1, xx1, yy2, xx2)
    {
        if (Math.max(x1, xx1) < Math.min(x2, xx2) && Math.max(y1, yy1) < Math.min(y2, yy2))
        { 
            return area(Math.max(y1, yy1), Math.min(x2, xx2), Math.min(y2, yy2), Math.max(x1, xx1));
        }
        else
        {
            return 0;
        }
    }
    
    
    function area(y1, x1, y2, x2)
    {
        return Math.abs(x1 - x2) * Math.abs(y1 - y2);
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$.writeln ("\nINI");
   
    var dom = new NodeWithExtras();
    scope.html = dom.nodeAppend('html');

$.writeln ("\n111");

    bookSpec.htmlInitialisation();

    if (scope.bookContent === undefined) scope.bookContent = scope.html;

    scope.workingNode = scope.bookContent;
    
    //Caches
    var processedMediasLabels = [];

$.writeln ("\n222");    
    var pagesArr = [];
    var docPages = app.activeDocument.pages;
    for (var i = 0, dpl = docPages.length; i<dpl; i++)
    {
        var sortedPageItems = docPages.item(i).allPageItems;

        sortedPageItems.sort (function(a, b)
        { 
            if (Math.abs(a.geometricBounds[0] - b.geometricBounds[0]) < 1)
            { 
                return a.geometricBounds[1] - b.geometricBounds[1];
            }
            else
            {
                return a.geometricBounds[0] - b.geometricBounds[0];
            }
        });
        
        pagesArr.push (sortedPageItems);
    }

    
$.writeln ("\n333");
$.writeln ("\n333 pages: " + pagesArr.length);

    scope.previousStyle = '';
    scope.nextStyle = '';
    //Loop on PAGES
    for (var i = 0, pal = pagesArr.length; i < pal; i++)
    {
//$.writeln ("333 ini - " + i);
         
        var current_undo_page = getUndoHistoryLength ();

        scope.currPageIndex = i;
        var pageItemArr = pagesArr[i];

export_bar.value    = 0;
export_bar.maxvalue = pageItemArr.length;
        
        //Loop on PAGEITEMS
        for (var j = 0, pageItemArrLength = pageItemArr.length; j<pageItemArrLength; j++)
        {
            var current_undo_pag_item = getUndoHistoryLength ();
            
            scope.currPageItemIndex = j;
            scope.currPageItem = pageItemArr[j];
            var currPageItemVisibleBounds;
            scope.currPageItemZIndex = pageItemArr[j].index;

            var mediaName = pageItemArr[j].extractLabel("oc_media");

            if (mediaName !== '')
            {
//$.writeln ("333 custom - " + i + " - "+ j);        
                if (processedMediasLabels.indexOf(mediaName) === -1)
                {
                    processedMediasLabels.push(mediaName);

                    var mediaExportSpecs      = exportMedia (mediaName);
                    currPageItemVisibleBounds = mediaExportSpecs.media_bounds;
                    scope.currPageItemZIndex        = -1;
                    
                    if (mediaExportSpecs.type == "figure")
                    {
                        // Figure
                        /* var fig_attrs = new Array (); */
                        if (mediaExportSpecs.title != "") fig_attrs['data-title'] = mediaExportSpecs.title;
                        if (mediaExportSpecs.thumb != "") fig_attrs['data-thumb'] = mediaExportSpecs.thumb;
                        
                        // 0 -> all, 1 -> TOC and Modulde, 2, Page and Module, 3 -> only Module
                        if      (mediaExportSpecs.visibility == "1") fig_attrs['style']       = "display:none;";
                        else if (mediaExportSpecs.visibility == "2") fig_attrs['data-hidden'] = "";
                        else if (mediaExportSpecs.visibility == "3")
                        {
                            fig_attrs['style']       = "display:none;";
                            fig_attrs['data-hidden'] = "";
                        }
                        
                        var figure_node = scope.bookContent.node ("figure", undefined, fig_attrs).append ();
                        
                        // Link
                        var link_attrs     = new Array ();
                        link_attrs["href"] = mediaExportSpecs.href;        
                        var link_node      = figure_node.node ("a", undefined, link_attrs).append ();
                        
                        // Image
                        var img_attrs = new Array ();
                        if (mediaExportSpecs.title != "") img_attrs["alt"] = mediaExportSpecs.title;
                        img_attrs["src"] = images_folder + mediaExportSpecs.file_name;
                        link_node.node ("img", undefined, img_attrs).append ();
                    }
                    else
                    {
                        // Multimedia
                        var multimedia_node = scope.bookContent.node ("multimedia").append ();
                        
                        // Image
                        var img_attrs = new Array ();
                        if (mediaExportSpecs.title != "") img_attrs["alt"] = mediaExportSpecs.title;
                        img_attrs["src"] = images_folder + mediaExportSpecs.file_name;
                        multimedia_node.node ("img", undefined, img_attrs).append ();
                    }
                }
            }
            else
            {
                if (pageItemArr[j] instanceof TextFrame)
                {
//$.writeln ("333 TextFrame - " + i + " - "+ j + " / id: " + pageItemArr[j].id);
                    //TODO A veces , necesitamos exportar un textframe que resulta no tener ningun parrafo,
                    //solo sirve en el indesign como fondo para una imagen, como un rectangulo
                    //(ver matematicas 1E ESO pagina 254). Este if permite exportarlos. Verificar que no
                    //provoque problemas, como exportar cuadros inutiles.
                    if (pageItemArr[j].paragraphs.length === 0 || (pageItemArr[j].paragraphs.length === 1 && pageItemArr[j].contents.trim() === ''))
                    {
                        var currFillColor = pageItemArr[j].fillColor.name;

                        if (bookSpec.p_.hasOwnProperty(currFillColor))
                        {
                            //$.writeln('emptyretardfill: ' + currFillColor);
                            currPageItemVisibleBounds = pageItemArr[j].visibleBounds;
                            bookSpec.p_[currFillColor]();
                        }
                    }

                    currPageItemVisibleBounds = pageItemArr[j].visibleBounds;
                    //Loop on PARAGRAPHS
                    for (var k = 0, parLength = pageItemArr[j].paragraphs.length; k<parLength; k++)
                    {
                        var current_undo_txt_frame = getUndoHistoryLength ();

                        try
                        {
                            if (pageItemArr[j].paragraphs[k].isValid && pageItemArr[j].paragraphs[k].hasOwnProperty ("baseline") && pageItemArr[j].paragraphs[k].baseline != null)
                            {
                                var currBaseline = pageItemArr[j].paragraphs[k].baseline;
                            }                        
                        }
                        catch (Err) { $.writeln ("Baseline at pageItemArr[" + j + "].paragraph[" + k + "] not working..."); }
                        
                        if (pageItemArr[j].paragraphs[k].tables.length)
                        {
                            for (var t = 0, tl = pageItemArr[j].paragraphs[k].tables.length; t < tl; t++)
                            {
                                getTableHTML (pageItemArr[j].paragraphs[k].tables[t]);
                            }
                        }

                        scope.currParagraphIndex = k;
                        scope.style = pageItemArr[j].paragraphs[k].appliedParagraphStyle.name;
                        scope.nextStyle = k<parLength - 1 ? pageItemArr[j].paragraphs[k + 1].appliedParagraphStyle.name : 'notready';
                        scope.isNextStyleFromSameTextFrame = true;
                        var nextTextFrame = undefined;
                        
                        if (scope.nextStyle == 'notready')
                        {
                            var n = 0;
                            while (j + n < pageItemArrLength - 1 && !(nextTextFrame instanceof TextFrame))
                            {
                                nextTextFrame = pageItemArr[j + n + 1];
                                n++;
                            }
                            
                            if (nextTextFrame && nextTextFrame.isValid && nextTextFrame instanceof TextFrame && nextTextFrame.paragraphs.length && nextTextFrame.paragraphs[0].isValid)
                            { 
                                scope.nextStyle = nextTextFrame.paragraphs[0].appliedParagraphStyle.name;
                            }
                            
                            scope.isNextStyleFromSameTextFrame = false;
                        }

                        scope.isNextStyleRecognized = bookSpec.p_.hasOwnProperty(scope.nextStyle)

                        if (bookSpec.p_.hasOwnProperty(scope.style))
                        {
                            var current_undo_paragraph = getUndoHistoryLength ();
//$.write ("bookSpec replace");
//$.writeln (pageItemArr[j].paragraphs[k]);
//$.writeln (pageItemArr[j].paragraphs[k].contents);
/*for (var p in pageItemArr[j].paragraphs[k])
{
    try
    {
        
        if      (typeof pageItemArr[j].paragraphs[k][p] == "string")                 $.writeln (pageItemArr[j].paragraphs[k][p]);
        else if (typeof pageItemArr[j].paragraphs[k][p].hasOwnProperty ("contents")) $.writeln (pageItemArr[j].paragraphs[k][p].contents); 
        else if (pageItemArr[j].paragraphs[k][p].constructor == "TextFrame")         { $.write ("textFrame  /  "); $.writeln (pageItemArr[j].paragraphs[k][p].contents); }
        else                                                                         $.writeln ("?");
    }
    catch (ERR) {}
}
exit ();*/

                            app.doScript(replaceInlineContents, ScriptLanguage.JAVASCRIPT, pageItemArr[j].paragraphs[k], UndoModes.FAST_ENTIRE_SCRIPT, 'Grep ops');
                            scope.currParagraph = pageItemArr[j].paragraphs[k];
                            
                            if (scope.currParagraph.isValid)
                            {
                                scope.currContents = scope.currParagraph.contents;
                                bookSpec.p_[scope.style]();
                            }
                            
                            if (app.activeDocument.undoHistory.length)
                            {
                                if (app.activeDocument.undoHistory[0] == 'Grep ops')
                                {
                                    app.activeDocument.undo();
                                }
                            }
                            
                            undoToLength (current_undo_paragraph);
                        }
                        else
                        {
//try{var cc=scope.currParagraph.contents;$.writeln("bookSpec: " + scope.style + "  -->  "+cc.substr(0,Math.min(60,cc.length)));}catch(err){}
                        }
                        
                        scope.previousStyle = scope.style;
                        scope.isPreviousStyleFromSameTextFrame = k<parLength - 1;
                        scope.isPreviousStyleRecognized = bookSpec.p_.hasOwnProperty(scope.previousStyle);
                        
                        undoToLength (current_undo_txt_frame);
                    }
                }  
                else if (pageItemArr[j] instanceof Image || (pageItemArr[j] instanceof EPS && !(pageItemArr[j].parent.parent instanceof Character)))
                {
//$.writeln ("333 Image or EPS (not Char) - " + i + " - "+ j + " / id: " + pageItemArr[j].id);            
                    currPageItemVisibleBounds = pageItemArr[j].visibleBounds;
                    var exportImg     = exportImageByPageItemID (pageItemArr[j].id).split ('<img src="')[1].split ('" alt')[0];
                    var imgNode       =
                    {
                        mNode0:         'multimedia',
                        mNode0_0:       'img',
                        mProperties0_0: 'src<' + exportImg,
                        mNode0_1:       'figcaption',
                        mClass0_1:      'pie_foto_naranja'
                    }

                    scope.bookContent.declarativeAppend(imgNode);
                }
                else if (pageItemArr[j] instanceof Rectangle)
                {
//$.writeln ("333 Rectangle - " + i + " - "+ j + " / id: " + pageItemArr[j].id);
                    try
                    {
                        var currFillColor = pageItemArr[j].fillColor.name;
                        
                        if (bookSpec.p_.hasOwnProperty(currFillColor))
                        {
                            //$.writeln('emptyretardfillbla: ' + currFillColor);
                            currPageItemVisibleBounds = pageItemArr[j].visibleBounds;
                            bookSpec.p_[currFillColor]();
                        }
                    }
                    catch (err)
                    {
                        $.writeln ("Error con fillcolor en rectangle");
                    }
                }
            }
            
            export_bar.value = export_bar.value + 1;
            
            undoToLength (current_undo_pag_item);
        }
        
        undoToLength (current_undo_page);
        
//$.writeln ("333 end - " + i);        
    }

    bookSpec.afterContentCreation();

$.writeln ("\n444");        
    
    
    reorderNodesByDeepness (scope.bookContent);

$.writeln ("\n555");

    bookSpec.afterReorderByDeepness();
    
$.writeln ("\n666");

    reorderNodesByPosition (scope.bookContent);

$.writeln ("\n777");

    bookSpec.afterReorderByPosition();
        
$.writeln ("\n888");        
        
    var folder = new Folder (export_folder);
    if (!folder.exists) folder.create();
    var filepath = export_folder + html_exported_name;
    var file     = new File(filepath);
    file.open ('w');
    file.encoding = 'UTF-8';

    file.write
    (
        scope.html.toString ().replace (/[\uFFFC]/g,                     '')           // Elimina [OBJ]  (caracter de objeto reemplazable) del código html exportado
                              //.replace (/[\u0000-\u001F]/g,              '')           // Elimina los caracteres de control (los primeros, existen más...) LO QUITO, ELIMINA DEMASIADOS
                              .replace (/[\u0007]/g,                     '')           // Elimina [BELL] (caracter de control) del código html exportado
                              .replace (/[\u0016|\u2416]/g,              '')           // Elimina [SYN]  (caracter de control) del código html exportado
                              .replace (/src=[\u201D](.*?)[\u201D]/gi,   'src="$1"')   // Cambia src=”...”   por src="..."   (por motivo desconocido pone ” al insertar " en contents)
                              .replace (/alt=[\u201D](.*?)[\u201D]/gi,   'alt="$1"')   // Cambia alt=”...”   por alt="..."   (por motivo desconocido pone ” al insertar " en contents)
                              .replace (/class=[\u201D](.*?)[\u201D]/gi, 'class="$1"') // Cambia class=”...” por class="..." (por motivo desconocido pone ” al insertar " en contents)
                              .replace (/style=[\u201D](.*?)[\u201D]/gi, 'style="$1"') // Cambia style=”...” por style="..." (por motivo desconocido pone ” al insertar " en contents)
    );
    
    file.close ();
    
    $.writeln ("\n ------ Exportación finalizada  ------ ");
}