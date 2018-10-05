

// Undo functions
function getUndoHistoryLength ()       { return app.activeDocument.undoHistory.length;                                      }
function undoToLength         (length) { while (app.activeDocument.undoHistory.length > length) app.activeDocument.undo (); }
function undoAll              ()       { while (app.activeDocument.undoHistory.length > 0)      app.activeDocument.undo (); }



function showPopup (popup_title, popup_message, popup_panel_title)
{
    var popup_dialog        = new Window      ("dialog", popup_title, undefined, { closeButton: false });
    var popup_panel         = popup_dialog.add ("panel", undefined, popup_panel_title);
    popup_panel.orientation = "column";
    popup_panel.alignment   = "left";
    var popup_texts         = popup_message.split ("\n");        
    for (var l=0, maxL=popup_texts.length; l<maxL; l++) popup_panel.add ('statictext', undefined, popup_texts[l]);        
    
    var popup_group_buttons         = popup_dialog.add ("group");        
    popup_group_buttons.orientation = "row";
    popup_group_buttons.add ("button", undefined, "Accept", {name: "ok" });
    //popup_group_buttons.add ("button", undefined, "Cancel", {name: "cancel"});

    /*if (popup_dialog.show () == 1) return true;
    else                           return false;*/
    popup_dialog.show ();
}



function getSafeFileName (filename)
{
    filename = filename.trim ().split (' ').join ('_');
    
    filename = filename.replace (/ñ/gi, 'n');
    filename = filename.replace (/Ñ/gi, 'N');
    
    filename = filename.replace (/[áàâä]/g, 'a');
    filename = filename.replace (/[ÁÀÂÄ]/g, 'A');
    
    filename = filename.replace (/[éèêë]/g, 'e');
    filename = filename.replace (/[ÉÈÊË]/g, 'E');
    
    filename = filename.replace (/[íìîï]/g, 'i');
    filename = filename.replace (/[ÍÌÎÏ]/g, 'I');
    
    filename = filename.replace (/[óòôö]/g, 'o');    
    filename = filename.replace (/[ÓÒÔÖ]/g, 'O');
    
    filename = filename.replace (/[úùûü]/g, 'u');
    filename = filename.replace (/[ÚÙÛÜ]/g, 'U');
    
    filename = filename.replace (/[ç]/g, 'c');
    filename = filename.replace (/[Ç]/g, 'c');
    
    filename = filename.replace (/[^a-z0-9_\-]/gi, '-');
    
    return filename;
}



function getSafeTimeHash ()
{
    var safe_chars = "abcdefghijklmnopqrstuvwxyz-_0123456789"; // [0 - 37]
    var safe_len   = safe_chars.length;

    var date  = new Date  ();
    var stamp = new Array ();
    //stamp.push (parseInt (date.getFullYear ().toString ().substring (2, 4))); // Years       [0 -  99]
    stamp.push (date.getMonth        ());                                     // Months      [0 -  11]
    stamp.push (date.getDate         () - 1);                                 // Days        [0 -  30]
    stamp.push (date.getHours        ());                                     // Hours       [0 -  23]
    stamp.push (date.getMinutes      ());                                     // Minutes     [0 -  59]
    stamp.push (date.getSeconds      ());                                     // Seconds     [0 -  59]
    stamp.push (date.getMilliseconds ());                                     // Miliseconds [0 - 999]
    stamp.push (Math.floor (Math.random () * safe_len));                      // Random      [0 - (safe_len - 1)]
    //stamp.push (Math.floor (Math.random () * safe_len));                    // Random      [0 - (safe_len - 1)]

    var hash = "";

    for (var i=0, max=stamp.length; i<max; i++)
    {
        var num_left = stamp[i];
        var done     = false;
        
        while (!done)
        {
            if (num_left <= safe_len - 1)
            {
                hash += safe_chars.charAt (num_left);
                done  = true;
            }
            else
            {
                var units = num_left % 10;
                hash     += safe_chars.charAt (units);
                num_left  = (num_left - units) / 10;
            }                
        }
    }        
    
    return hash;
}



function removeFolder (folder_path)
{
    var current_folder = Folder (folder_path);
    var inside_files   = current_folder.getFiles ();
    
    for (var f=0, fMax=inside_files.length; f<fMax; f++) 
    {
        if (typeof inside_files[f].getFiles === "function") removeFolder (inside_files[f].fsName);
        else                                                inside_files[f].remove ();
    }
    
    current_folder.remove ();
}



function simpleClone(simpleObject)
{
    var result = {};
    for (var property in simpleObject) { 
        if(typeof simpleObject[property] === 'string' || typeof simpleObject[property] === 'number') {
            result[property] = simpleObject[property];
        }
    }
    return result;
}


function clearExtendScriptConsole ()
{
    if (app.name === "ExtendScript Toolkit") app.clc ();
    else
    {
        var estApp = BridgeTalk.getSpecifier ("estoolkit");
        if (estApp)
        {
            var bt    = new BridgeTalk;
            bt.target = estApp;
            bt.body   = "app.clc()";
            bt.send ();
        }
    }
}


// -------------------------------------------------------------------

function printItemSelectedVisibleBounds ()
{
    $.writeln ("id: " + app.activeDocument.selection[0].id);
    $.writeln ("gb: " + app.activeDocument.selection[0].geometricBounds);
    $.writeln ("gb: " + app.activeDocument.selection[0].geometricBounds);
}



function getTableBounds (table)
{
    var table_bounds      = [0, 0, 0, 0];
    var text_frame        = table.parent;
    var text_frame_bounds = text_frame.geometricBounds;
    var text_frame_h      = text_frame_bounds[2] - text_frame_bounds[0];
    var text_frame_w      = text_frame_bounds[3] - text_frame_bounds[1];

    /* ---------------------------------------------------------------------------------
    var table_width       = table.width;
    var table_height      = table.height;

    // see how we're justified vertically
    var pref = text_frame.textFramePreferences;

    // The inset is either an equal measure for all four sides or an array. We will use it as an array.
    var inset = pref.insetSpacing;
    if (inset.length != 4) inset = [inset, inset, inset, inset];

    // Top
    if      (pref.verticalJustification == VerticalJustification.TOP_ALIGN)    y1 = text_frame_bounds[0] + inset[0];                                                               // Against the top edge
    else if (pref.verticalJustification == VerticalJustification.BOTTOM_ALIGN) y1 = text_frame_bounds[2] - inset[2] - table_height;                                                // Against the bottom edge
    else                                                                       y1 = ((text_frame_bounds[0] + inset[0]) + (text_frame_bounds[2] - inset[2])) / 2 - table_height / 2; // Center alignment

    // Left
    var just = text_frame.insertionPoints[0].justification;
    if      (just == Justification.LEFT_JUSTIFIED  || just == Justification.LEFT_ALIGN)  x1 = text_frame_bounds[1] + inset[1];
    else if (just == Justification.RIGHT_JUSTIFIED || just == Justification.RIGHT_ALIGN) x1 = text_frame_bounds[3] - inset[3] - table_width;
    else                                                                                 x1 = ((text_frame_bounds[1] + inset[1]) + (text_frame_bounds[3] - inset[3])) / 2 - table_width / 2;

    $.writeln ("TTb: " + [y1, x1, y1 + table_height, x1 + table_width]);

    //return [y1, x1, y1 + table_height, x1 + table_width];
    --------------------------------------------------------------------------------- */


    //var paragraphs = textFrame.paragraphs; paragraphs[p].pointSize; paragraphs[p].spaceBefore; paragraphs[p].spaceAfter;


    var table_in_frame     = table.index;
    var paragraphs         = text_frame.paragraphs;
    var para_index         = -1;
    var table_index        = 0;
    var curr_table         = 0;
    var index_in_paragraph = 0;

    for (var p=0, maxP=paragraphs.length; (p<maxP) && (para_index==-1); p++)
    {
        var tables_len = paragraphs[p].tables.length;

        if (tables_len > 0)
        {
            index_in_paragraph = 0;
            for (var t=0; (t<tables_len) && (para_index==-1); t++)
            {
                if (table_in_frame == curr_table) para_index = p;
                else
                {
                    table_index++;
                    index_in_paragraph++;
                }

                curr_table++;
            }
        }
    }


    if (para_index > -1)
    {
        var tables_len = paragraphs[para_index].tables.length;

        if (tables_len > 1)
        {
            var tables  = paragraphs[para_index].tables;
            var total_w = 0;
            var total_h = 0;

            for (var t=0; t<tables_len; t++)
            {
                total_w += tables[t].width;
                total_h += tables[t].height;
            }

            if (total_w > text_frame_w) // Están en vertical
            {
                if (index_in_paragraph == 0) // La primera
                {
                    var y1       = text_frame_bounds[0];
                    table_bounds = [y1, paragraphs[para_index].horizontalOffset, y1 + table.height, paragraphs[para_index].endHorizontalOffset];
                }
                else if (index_in_paragraph == tables_len - 1) // La última
                {
                    var y2       = paragraphs[para_index].endBaseline;
                    table_bounds = [y2 - table.height, paragraphs[para_index].horizontalOffset, y2, paragraphs[para_index].endHorizontalOffset];
                }
                else // Intermedia (es una aproximación)
                {
                    var y1     = (para_index > 0) ? (paragraphs[para_index - 1].endBaseline + 1) : text_frame_bounds[0];
                    var margin = ((paragraphs[para_index].endBaseline - y1) - total_h) / (tables_len + 1);
                    y1        += margin * (index_in_paragraph + 1);

                    for (var t=0; t<index_in_paragraph; t++) y1 += tables[t].height;

                    table_bounds = [y1, paragraphs[para_index].horizontalOffset, y1 + tables[index_in_paragraph].height, paragraphs[para_index].endHorizontalOffset];
                }
            }
            else if (total_h > text_frame_h) // Están en horizontal
            {
                if (index_in_paragraph == 0) // La primera
                {
                    var x1       = text_frame_bounds[1];
                    table_bounds = [paragraphs[para_index].endBaseline - table.height, x1, paragraphs[para_index].endBaseline, x1 + table.width];
                }
                else if (index_in_paragraph == tables_len - 1) // La última
                {
                    var x2       = paragraphs[para_index].endHorizontalOffset;
                    table_bounds = [paragraphs[para_index].endBaseline - table.height, x2 - table.width, paragraphs[para_index].endBaseline, x2];
                }
                else // Intermedia (es una aproximación)
                {
                    var x1     = text_frame_bounds[1];
                    var margin = ((text_frame_bounds[3] - x1) - total_w) / (tables_len + 1);
                    x1        += margin * (index_in_paragraph + 1);

                    for (var t=0; t<index_in_paragraph; t++) x1 += tables[t].width;

                    table_bounds = [paragraphs[para_index].endBaseline - table.height, x1, paragraphs[para_index].endBaseline, x1 + table.width];
                }
            }
        }
        else table_bounds = [paragraphs[para_index].endBaseline - table.height, paragraphs[para_index].horizontalOffset, paragraphs[para_index].endBaseline, paragraphs[para_index].endHorizontalOffset];
    }

    return table_bounds;
}


/*
function getCellBounds (table, row, col)
{
    var table_bounds = getTableBounds (table);

    // Check row and col
    if (row < 0 || row >= table.rows.length)    return null;
    if (col < 0 || col >= table.columns.length) return null;

    // Get base positions
    var x1 = table_bounds[1];
    var y1 = table_bounds[0];

    for (var r = 0; r < row; ++r) y1 += table.rows   [r].height;
    for (var c = 0; c < col; ++c) x1 += table.columns[c].width;

    $.writeln ("cb: " + [y1, x1, y1 + table.rows[row].height, x1 + table.columns[col].width]);

    return [y1, x1, y1 + table.rows[row].height, x1 + table.columns[col].width];
}
*/



function getCellBounds (cell)
{
    var table        = cell.parent;
    var table_bounds = getTableBounds (table);
    var row          = cell.parentRow.index;
    var col          = cell.parentColumn.index;

    // Check row and col
    if (row < 0 || row >= table.rows.length)    return null;
    if (col < 0 || col >= table.columns.length) return null;

    // Get base positions
    var x1 = table_bounds[1];
    var y1 = table_bounds[0];

    for (var r = 0; r < row; ++r) y1 += table.rows   [r].height;
    for (var c = 0; c < col; ++c) x1 += table.columns[c].width;

    return [y1, x1, y1 + cell.height, x1 + cell.width];
}



function createRectangleAtCell (cell)
{
    // Get the location of the cell
    var pos = getCellBounds (cell);
    if (pos == null) return null;

    var textFrame = cell.parent.parent;
    var pg        = textFrame.parentPage;

    // add our position settings to the caller's properties
    var prop = new Object();
    prop.geometricBounds = new Array (pos[0], pos[1], pos[2], pos[3]);

    switch (randomIntFromInterval (0, 5))
    {
        case 0: prop.fillColor = "Black"; break;
        case 1: prop.fillColor = "Blue"; break;
        case 2: prop.fillColor = "Red"; break;
        case 3: prop.fillColor = "Green"; break;
        case 4: prop.fillColor = "Orange"; break;
        case 5: prop.fillColor = "Yellow"; break;
    }


    //  create the rectangle. There is a method for creating rectangles that takes the properties as the third parameter,
    // however in most cases this method will fail.
    var r = pg.rectangles.add ();
    r.properties = prop;

    return r;
}



function randomIntFromInterval (min, max)
{
    return Math.floor (Math.random () * (max - min + 1) + min);
}


// ---------------------------------------------------------------------------------------------------------- //


function pageWidth(page)
{
    return Math.abs(page.bounds[3] - page.bounds[1]);
}



function pageWidthWithMargins(page)
{
    var left = page.marginPreferences.left;
    var right = page.marginPreferences.right;
    return pageWidth(page) - left - right;
}



function columnWidth (page)
{
    var pw = pageWidthWithMargins(page);
    var columnCount = page.marginPreferences.columnCount;
    var columnGutter = page.marginPreferences.columnGutter;

    if (columnCount > 0) return (pw - (columnCount - 1)*columnGutter) / columnCount;
    else                 return pw;
}



function getCharacterStyleIfUsed (styleGroup, styleName)
{
    var isUsed = true;

    isUsed = isUsed ? isUsed && app.activeDocument.characterStyleGroups.itemByName(styleGroup) : false;
    isUsed = isUsed ? isUsed && app.activeDocument.characterStyleGroups.itemByName(styleGroup).isValid : false;
    isUsed = isUsed ? isUsed && app.activeDocument.characterStyleGroups.itemByName(styleGroup).characterStyles.itemByName(styleName) : false;
    isUsed = isUsed ? isUsed && app.activeDocument.characterStyleGroups.itemByName(styleGroup).characterStyles.itemByName(styleName).isValid : false;

    if (isUsed) return app.activeDocument.characterStyleGroups.itemByName(styleGroup).characterStyles.itemByName(styleName);
    else        return undefined;
}



function changeGrepInlineTags (paragraph, parameter, value, substitutionBefore, substitutionAfter)
{
    if (value) 
    {
        app.findGrepPreferences   = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        app.findGrepPreferences[parameter] = value;
        app.findGrepPreferences.findWhat = '([^\n\r<]*>)?(.*)(<[^\n\r>]*)(?!.*>)|([^\n\r<]*>)?(.+)';
        app.changeGrepPreferences.changeTo = '$1$4' + substitutionBefore + '$2$5' + substitutionAfter + '$3';
        paragraph.changeGrep();
        app.findGrepPreferences   = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
    }
}