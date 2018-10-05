/*  
    @@@BUILDINFO@@@ "OneClick.jsx" 0.0.3 27 April 2015
    This script has two functions one generates html and the other export PNG images.
*/

#targetengine "oneclick"

var oneclick_folder = "/Oneclick_Files/";
$.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + "jsShim.js"));
$.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + "dommy.js"));
$.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + "OneClickUtils.js"));


var texts =
{
    "warning":                    "Warning",
    "info":                       "Information",
    "alert_document":             "No documents are open. Please open a document and try again.",
    "alert_spread":                "The active spread does not contain any page items.",
    "alert_fonts":                "All the needed fonts are not installed.\nWithout them the results won't be the best.",
    "specification_dialog_title": "Exportation type:",
    "specification_panel_title":  "Choose type:",    
    "panel_actions":              "Actions",
    "panel_tree":                 "Medias",    
    "relink":                     "Relink medias",
    "relink_dialog_title":        "Relink process information:",
    "relink_dialog_texts":        "This process is slow and must be saved afterwards.\n(ESC may cancel it)\nIf you press accept, be sure to choose the correct folder with the actual resources.",    
    "relink_save_title":          "Relink process ended:",
    "relink_save_texts":          "Check the links and if it's all SAVE.",    
    "add_media":                  "Add custom media",
    "edit_media":                 "Edit custom media",
    "remove_media":               "Remove custom media",
    "group_image":                "Export image",
    "document_export":            "Export document",
    "undo_script_string":         "Script actions",
    "select_one_or_more":         "Please select at least one object",
    "exporting_image":            "Exporting Image...",
    "exporting_image_done":       "The image has been exported.",
    "exporting_image_fail_1":     "Error while exporting image:",
    "exporting_image_fail_2":     "Line:",    
    "exporting_document_done":    "The document has been exported.",
    "exporting_document_fail":    "The document exportation has failed."
};

var specification_types =
[
    ["Bachillerato", "bookSpecBACH.js"],
    ["ESO",          "bookSpecESO.js"],
    ["Argentina",    "bookSpecARG.js"]
];


var export_folder = "~/Desktop/";
var images_folder;
var html_exported_name;


function loadFilesAndSpeficication ()
{
    var specification_dialog                = new Window ("dialog", texts["specification_dialog_title"], undefined, { closeButton: false });
    var specification_panel                 = specification_dialog.add ("panel", undefined, texts["specification_panel_title"]);    
    specification_panel.orientation         = "column";
    specification_panel.alignment           = "left";
    specification_panel.alignChildren       = "left";
    
    /*var top_separator                       = specification_panel.add ('statictext', undefined, " ");
    top_separator.preferredSize             = [1,1,1];
    top_separator.maximumSize.height        = 1;
    top_separator.minimumSize.height        = 1;*/
    
    var document_name                       = app.activeDocument.name;
    document_name                           = getSafeFileName (document_name.substr (0, document_name.lastIndexOf ('.')));
    
    var specification_export_id             = specification_panel.add ("edittext", undefined, document_name);
    specification_export_id.characters      = 50;
    
    var specification_radio_buttons           = specification_dialog.add ("group");  
    specification_radio_buttons.orientation   = "column";
    specification_radio_buttons.alignment     = "left";
    specification_radio_buttons.alignChildren = "left";
    for (var t=0, maxT=specification_types.length; t<maxT; t++) specification_radio_buttons.add ("radiobutton", undefined, specification_types[t][0]);
    specification_radio_buttons.children[0].value   = true;

    var specification_group_buttons           = specification_dialog.add ("group");  
    specification_group_buttons.orientation = "row";
    specification_group_buttons.add ("button", undefined, "Accept", {name: "ok" });
    specification_group_buttons.add ("button", undefined, "Cancel", {name: "cancel"});

    if (specification_dialog.show () == 1) 
    {
        var specFile_index = 0;        
        for (var s=0, sMax=specification_radio_buttons.children.length; s<sMax; s++)
        {
            if (specification_radio_buttons.children[s].value == true)
            {
                specFile_index = s;
                break;
            }
        }
        
        var export_id      = getSafeFileName (specification_export_id.text);
        if (export_id == "") export_id = document_name;
        if (export_id == "") export_id = getSafeTimeHash ();
        
        images_folder      = "images_" + export_id + "/";
        html_exported_name = export_id + ".html";
        
        return specification_types[specFile_index][1];
    }
    else return "";
}



main ();
function main ()
{
    clearExtendScriptConsole ();    
    
    // Make certain that user interaction (display of dialogs, etc.) is turned on.    
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;

    if (app.documents.length != 0)
    {
        if (app.activeWindow.activeSpread.pageItems.length != 0)
        {
            var spec_file = loadFilesAndSpeficication ();
            if (spec_file !== "") 
            {
                $.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + spec_file));
                
                export_folder += bookSpec.custom_export_folder;
                
                $.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + "documentExport.js"));                        
                $.evalFile (new File ((new File ($.fileName)).parent.fullName + oneclick_folder + "OneClickMain.js"));
                
                openOneclickWindow ();
            }
        }
        else showPopup (texts["warning"], texts["alert_spread"]);
    }
    else showPopup (texts["warning"], texts["alert_document"]);
}

