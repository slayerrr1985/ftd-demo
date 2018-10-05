var log_file_path;
var log_file;
var tree_medias;
var image_export_dpi     = 222;
var image_export_quality = 3; // 0 min, 3 max
//var all_fonts_installed = false;


function openOneclickWindow ()
{     
    // Embbebed icons --------------------------------------------------------------------------------------------------------------------
    var relink_icon       = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x03\x00\x00\x00(-\x0FS\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03\"iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmp:CreatorTool=\"Adobe Photoshop CS6 (Windows)\" xmpMM:InstanceID=\"xmp.iid:A8C561C3091011E5ABB09E605B5BD731\" xmpMM:DocumentID=\"xmp.did:A8C561C4091011E5ABB09E605B5BD731\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:A8C561C1091011E5ABB09E605B5BD731\" stRef:documentID=\"xmp.did:A8C561C2091011E5ABB09E605B5BD731\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x18\u009BM,\x00\x00\x02\x04PLTE\u00FF\u00FF\u00FF\u00A5\u00A5\u00A5\x00\x00\x00\u008D\u008A\u008D\u008E\u008E\u008E\u008E\u008D\u008E\u00DD\u00DD\u00DD\u008C\u008B\u008A\u008D\u008C\u008Dfkn\u008D\u008C\u008C\u008D\u008B\u008D\u00C3\u00C3\u00C9\u0099\u0099\u0099iknilqbgm\u0091\u0091\u0092\u008E\u008E\u008DchndglR\u00BE\u00F7aaf[^c\u00CA\u00C8\u00CDM\u00E0S\u00C8\u00CA\u00CD\u008D\u008D\u008Dv\u00D4\u00F9\u008E\u0091\u0094\u00A8\u00A8\u00A8bejty\x7F\u00C3\u00C3\u00C7`]]\u00C0\u00C2\u00C5\x00_\x00o\u00D3\u00FCI\u00D5Mruza\u00C5\u00F6Vi\u0082\u0090\u00A0\u00A8SSX\x07Fn\u0093\u0096\u009B\x00\u00D1\tUWZjjofin\\_d\x03\x12\x05\u00B8\u00F2\u00FDv\u00AF~ccc\x00)\x01`p\u0081EVi\u00A7\u00F0\u00B0|\u0081\u0087\u00A2\u00F7\u00ADchk\u0092\u00A7\u0093H\u008D\u00B0NPSAFLd\u00E8n\x15Nr\u009A\u009D\u009D\u00A0\u00EA\u00FFNQV<\u00DB?RWZ\u008B\u008E\u0094\u00D0\u00F7\u00FE)+.;\u0088\u00AF15@\u00B7\u00BA\u00BF\u0098\u0098\u009Bnv~\u00C8\u00F3\u00FCM\u009C\u00C6Y\u00B5\u00E8//2`\u00C4\u00FABDG}\x7F\u0082CCF!\"$\u0090\u0090\u0091aad%0?f\u00C7\u00F7\u0091\u0094\u0099\u008A\u0090\u0096\x10\u00A5\u00FFRUZ\u0086\u0092\u0086[\u00E5d'\u00C0(\u00CD\u00CD\u00CD\t`\n\u00DE\u00E9\u00DE*4<7\u00D9;\u00A6\u00A6\u00A6o\u00D0\u00FB:\u00CE=TW\\`eh\u0099\u009B\u009EM]sky\u0084\u00A0\u00A5\u00AB\x03#4d\u00C6mU\u00E1\\\u00D7\u00E2\u00E6B\u00B2G?\u00DBD\u00A8\u00AC\u00A8\u00A2\u00A2\u00A72\u00D95f\u00AF\u00CD\u008E\u008D\u008D\u00CD\u00D0\u00D5P\u00BC\u00F7=JX\u00A3\u00A3\u00A3ACF\u00CC\u00FA\u00D4\u0090\u008F\u008E#%!XXXu\u00A7\u00B4BBGhmm\u0092\u0092\u0095\u0085\u0085\u0085\u0085\u00F3\u0091\u00C3\u00C7\u00CC\x05\x10\x15\u00B5\u00C9\u00D1\u00DB\u00DB\u00DB\u00A6\u00E3\u00F6Q\u00A7Y\u00E3\u00E8\u00EBSX[gggBBE\u008D\u008B\u008Bh\u00CD\u00FEn\u00EBzZ\u00E4bGLRZ\\_P`nU\u0099\u00B2\u00B5\u00B5\u00BAGJOe\u00ECp\u00B2\u00B2\u00B2Y^aejmG\u00D0K\u0096\u00B2\u009B9\u009F\u00DCS\u00B3\u00EAL\u00BA\u00F7\u0089\u00E1\u00FF]\u00E9eq\x18GP\x00\x00\x00\u00F9IDATx\u00DAb\u00E0e\u00E5\u00E0`ee\x01\x02!i.\u00AEZ^\x06V\x06\x14 \u00C4\u00C0\u00C1\u00A0\u0092f\u00CE\x04\x06\u00C5\u00CE:\f\\\f\u00DC\f)9K\u00CB\u008D\u0099\u0098\u00FA\u0082\u0082W,g\u0098\u00CE\u00C0\u00CCP-\u00B9zaIkd\u008D\u00EA\u008C\u00D0\u0095\f\u00EC@\u0081\u00CCR\u00A7\x1E+;\u00AD\u0089\u00AB\u00B25\u00EA\u00C1\x02\u00EE\u00B3f\u00DA4\u00A7\u0097\x05\u00BA\u00CA\u00C4\u008A\u0082\x05*\u0092'\u0099.\u00AB\u009C\u00EC\u00D5>\u00CF\u00DE\x07,\u00A0f=\u00D5L)\u00A0\u00DFD\u00B3\u0093\u008F?\u00BC\x05(`\u00E12\u0081GQ\u00B6\u00A0\u00D0\u009F\u00AD\u00AE7\x7F\t\u00D0ZC6N7y\x01[\x11a\u00E1DG?N\u00A0@\u009E\u0084\u0080\u009E\x07\u009B\u0094r\u0091HB\u0093.\x1FC\x12\u00838\x0F\u00FF\u0094\b\x03\u00B1\u00E89\x0Br;\u00E2\x17\x03\u00FD2\u00B7k~\u0095zHF\u00C34\u00CE8O\u0085\u00D9\f\u008D,Q\u0096mF\u00DA1\u0082\u0082\u00BE\u00DE\u00FA\x0Ea\u00DD\fl\u00A9\u008B\x18! \x0B\u0088\u00E5\u00D8\x00\x02\f\x00x\u00C3:\u00C6\u00F7m\u00EA\u00E9\x00\x00\x00\x00IEND\u00AEB`\u0082";
    var img_export_icon   = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03\"iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmp:CreatorTool=\"Adobe Photoshop CS6 (Windows)\" xmpMM:InstanceID=\"xmp.iid:879D450FE83711E4859F84EDBDDB8822\" xmpMM:DocumentID=\"xmp.did:879D4510E83711E4859F84EDBDDB8822\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:879D450DE83711E4859F84EDBDDB8822\" stRef:documentID=\"xmp.did:879D450EE83711E4859F84EDBDDB8822\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00FC\u00DF\u00E1\u00FE\x00\x00\x02\x15IDATx\u00DA\u0094RMh\x13A\x18}\u00BB;\u00C9f\u0093\u00CD\u00E6\u00A7\u0091P\x15\x15-\u00A4B\u00A5\u00F6 =\u0088\u00A07/BE\u0084\u0082)\u00E2\u00B5\u0087\u009E\u00DAC%\u0090\u0082E\u00C1\u0083\u00A0\u0087\u009E\x04\u00EF\u00F6\u0098\u0093\u008A\u00BD\u00D8\u0082'\u00BD$R$`\x0E*\u00A5f\u00D3l\x13\u008D\u00BB3\u00BB\u00DBo\u00D7V\u00F1\u00B6\u0099\u00E1\u00C17\x03\u00EF}o\u00E6{\u00D2\u00EDj\u00F5\x06\u0080\u00E3\x18n}\x7F\u00B9\u00B2R\x0B\u00AB[\u0095\u00CA\u009A?\u00E4:\u00E4 \x00s]w\u00C6\u00A3b\u00A2\u00FC\x14\u00F1x\x02\u00C9d\n\u00E9\u00B4\u008El.\u008B|>\u008B\x1C!\u0093\u00D1\u00916\x12Hu\x1AH\u00C8\u00FB\x10\u009C\u00CFP\u00EF\u00F9\u00C0\x00#4\t\u00A3\u00C3\u00F8\u00A7\u00CEMzzX3:|\u008BJ\u00F4<\x0F\u0092\u00E4\u0087\x7F\u00E0\u00B9nx'\u0093\u00C0\u00BB\u00A8\x02\u0086\x16\u0083\u00AEi8[,nZ\u009D\x0E~\u00EC\u00EC@\x16BH\u00C2\u00F7#\t\u00C8\u00A2\u008B+SS\u00E8[\u0096v*\u009F\u00BF\u00B4\u00D7n\u0083q\u00CEeA\u00D6n^706Z\u00C2\u0089\u0091qH\u00B4\u00F5\u0084\u008F\u00FE\u00C0\u0086=\u00E8\u00C3w[\x10\u00DD\x1E\u00B8\u00E0\u00E8t\u00BBx\u00B2\u00B8\u00F8x~u\u00F5\u00FE\u00C5RIf\u00C2q\u0094\u00C0\u00C1\u00A7/\x1F`Z_q\u00F9\u00BC\u0087\u00F1\u0093%\u00B8\u009E\u008CBZE\u00B2\u00A0!\u00A5\x16\t\x12\u0098\"\u00FDu\u00B3V\u00A9<\u00BC\u00BB\u00BC\\e\u008E\u00E3\u0084\x0E\u00DA\u00ED\x01\u00C0-\u00BC\u00EA\u00BF\u00C1V\u00E3=\n\u00C61\u008C\u00E8Y\"\u00AA\u0088\u00C3\u0087B\u00DD\u0085ppuz\x1A\u0085\\\x0EsKK\x0F~\u00D9\u00F6[\u00C6m;\x140\u00CD\x0B\u00E8\u00F5\u00FE\u00E5`o\u0090\u0085\u00C9\u00FF\u00CF\x01k\u00D6B\u00F2\u00EC\u00C2\u00C2#\x1A\u00C7\u00EB\u00CF\u00AD\u00D6V\u00E0@q\u00E9\t\u00AA\u00AA\x11\u00A8\x1BAa1\u009A\u00B5\u0084\u00DF6\u00FDC\u009FS\u00CD\u00E1\u00F0\x182\u0092\u008E\x17\u00EB\u00EBP\r\u00E3g}{{\u0093\u00C5\u00E3\u0090\u00BB\u00A6yOa,\u00D2\x14\u00D8\u00B9k\u0098-\u0097\u00F1\u00B1^\u009F\u00F3\u008E\u00EE\u0084m\x07I,\r\u0093\u00C4\u0080\u00D3\u00DA\u00D8\u00F8#@\u0089:\x1D\x14\u00B5gw\"\x0BxB\u009C\u00F1\x0F\u00B3\u00C3\u00F6ww\u009F\u008FMNN\x049\u0089\u00CA\u00F7\x1D\u00A7qt8\x10`\x00E8\x1C\x7F\u00CB\u00C84\u00AF\x00\x00\x00\x00IEND\u00AEB`\u0082";
    var doc_export_icon   = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03\"iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmp:CreatorTool=\"Adobe Photoshop CS6 (Windows)\" xmpMM:InstanceID=\"xmp.iid:0FF52D59E83711E4BCD4B24B778DA82D\" xmpMM:DocumentID=\"xmp.did:0FF52D5AE83711E4BCD4B24B778DA82D\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:0FF52D57E83711E4BCD4B24B778DA82D\" stRef:documentID=\"xmp.did:0FF52D58E83711E4BCD4B24B778DA82D\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\u00E5\x1B\u00C7\x11\x00\x00\x02HIDATx\u00DA\u008CS\u00CFk\x13Q\x10\u00FE\u00DE\u00CB\u00DA\x18Hj[Hb\u0084z\u00D0\u00F6\u00E4Y\n\u0085\x06\u00C1\u008B\x15\u00BC\u00FA'\x14\u00BDXJ\x15A*\u0082\u00BFQ/\u00E2\u00C1x\u00F0R\x10Ah=\n\u008A\x1EJR\u00E8\u00A9\u0087H.\u00DA\x1CD\u00C8\u008F\u00DAd\u009Bn6\u00D9\u00ECf\u00E3\u00CC\u00DB\u00DD4\u00DA\"\x0E\f\u00F32\u00FB\u00E6\u009Bo\u00BEy\x11\x17\u0096\u0096\u00C0&\u0084\u00B8D!\u0085\x7F\u00DB\x17\u00D7u\u00BF\u00F7\x1C\x07\u00BD^\x0F[\u00EB\u00EB\u00D0\u00F8\u00C0F\u00F1\u00C4\u00EB\u0085\u0085\u008C\u00D5\u00ED\u00C2\u00A6\u009C\u00E3\u00BAp(\x06\u00DF\u00F3\u00F9<\u00DEd\u00B3W\u00B8\x17\u00F97\u00CE\u009D\u009E\u009E\u0086Th\u009E\x0BB\u0087Kg\u00B7\u00D3A\u00A7\u00DD\u0086e\u009Ah6\u009B0\fC\u00C5\u00B7\u008B\u008B\x19\u00BAw\u009Ej'\x03JZ\u0097:\u00FA&\x04u\u0093B\u00E0H(\u00F4\x07o\u009B\u0080\u00EB\u00F5:2++871\u00F12\u00B3\u00BAz\u009B\u00D2\u00F7\x15\u0080\u00BB\x0F \u00B9\u0098\u009D\u00EDo\u0090t:\u00AD\u00C6\u0089F\u00A3\u00F8T(\u00D4\u00FB\f\u009CA\x06\f\u00E0\u009D\x0E\x05a&lT#\x0E\x1DA\u00D1\u00D8\u0087;\x00\u00B2U,\u00C2 ]\x1C\u00DB\u0096\u008Ee\u00C1\u00B2mH%\u009A\u00E7\u00DE\bR*\x10\u00E5\u00FEH\frT\u00D3\u00B0\u00BD\u00B3\u0083\u00B9\u0093O\u00B1\u00A7\u00EB\u00E1\u0096i\u009E5vwi\x04*\x0E4\x10\u00DE\x1C\n\x04D\u0097\u00BB\u00FD\u00D2uT\u00A8p\u00BBV\u0083E]\u00D9\u00BE^->9\u00F5,y\u008B4\u0091\x074\x10>u\x0693:\x07\f\u00D1\u00F7\x04%\x1AA#\x02\u00A7\u00A7Q\u00BC^y\u0098\u00BA\x1B\u00BB\u00A3\u00B94G\x7F\x0B\u00FC\u00A0\b\u00C0\u00F5\x13\u0085\u00DA+\u0094\u00A9\u00F3\u00CFr\x19\u00A5j\x15\rz\x0F\x0Ff\u00DE\x01f\x17#7\u00E5\u00BD\u00B60?k\u00DD\u00C1\x11\u0098>\u00BF<\x1Fddx\x18\u00C7b1L\u008E\u008F\u00AB\u00DF/\u0096\u0097\u00D5\u00C5\u00C85\u00EBQG\u0088\u008F\u00E6\u00F3\u00A1\u009C\u00DC+\u0095\u00C0:\u0090+\u00F2\u00D2_\u00A5\u00F4\u00C7\x11\x03\u00C2\u00A6\u00E2q\u00CC\x7F\u00B8\u0088x*eRqvt\u00BE\x03\u00ED\u00C7\u00DA\x1A\u0092SS\b\u008F\u008Di\bD\u00F4\u00FE\x1C}&\u0081&\u0097gg!i#\u00EFs\u00B9^\u00F2\x06P\u00D9\u00DCTw#\u0095\u008D\u008DD\u00A3^\x0F\x0F\u00A8\u00A9\nB\x14C\x1C\u00D9\u00A90D\u00ABd\x00\u00BE\u00CB5\\\u00CB]#\u00E4\t\u00A3Z\u00D5\u008F\u00CF\u00CC<\u00C6\x7F\u0098\u00DBj\u00E9\u00F0v\u00E3\u00FC\x16`\x009\u009C\x1D\u0086\u00ED`\u00BE\u00F6\x00\x00\x00\x00IEND\u00AEB`\u0082";    
    var add_media_icon    = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x04gAMA\x00\x00\u00AF\u00C87\x05\u008A\u00E9\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01\u00ACIDAT8\u00CB\u00A5\u00921\u008B\x13Q\x14\u0085\u00BF\u0091Q\u00D0B\\\x04A\u00D8\x14vI M~\u0081\u0090\u00C2\"\u00FF\"X\u00E6\x07\u0084\u00FC\u0084\u0080d\u008B\u0094I\u00BFe\u0082v\x166\u00CA\u00DAh\u00E9$M$\u00B3\u00E8\u00C2\u00D6&\x19\u0098\u00F7\u00EE\u00D9\"o&\tF\x0B\u00BD\u00F0\u00E0\u00F1\u00DE=\u0087s\u00CE\u00BD\u0091$\u00FE\u00A7b\u0080\u00C1`\u0090J\u00AAHJz\u00BD^\u00FDo\u0080n\u00B7\u00FB!\u00CF\u00F3\u0097\u00CE\u00B9d2\u0099\u00D4\u00E3\u00F0^i\u00B7\u00DB\u00CCf\u00B3\u00DA\u009Bw72\t\x01\u00DE\x03\x02\u0099a\x02o\u00B0\u00DDn\u00E9t:\u008CF\u00A3Z\u00A9\u00C0{\u00FFu:\u009D6\u00E3GOy~v\x1F\x19\b\u0090\t\x13\u00E8\u0080\u00E4\u00F6\u00C99\u00C3\u00E1\x10\u00E7\u00DC'\u0080\u00A8\u00C8`\u00F0\u00F6\u00A7\u00CE\u00CF\x1E\u00EC\x00\x06\u0092\u0090\u00C0\u00A4\u0092\u00C8L\u0098\u0089\u00E5M\u00C6\u00A0\u00F3\"*\x15\x10\u00E4z\x03$\u00CC\x02\u00B0\u00B8\u00DB1I\u00EE\u00ED8D\x00y\u00DB5\n\u00CC\f\x19\x01`%\u00B0 t\u00EE\x04\u008130/,4\u00ED\u009A\u008B\u00BB\u00ED\u0095\b\u00CC\u00E9w\x02s\u00867\u0095>u\u00E0Y\u00C1R\u00A1\u00C4\u009D\"p\x0E\u00BC\u00B7\u00D2\u00FF1\u00C9^\u0091\x04\u00CENY\u00F0\x1E\u00EF\u00E3\u0090z\x00*\u008C\u00F2 @Ix\x7FR\u00C1\u00EE\u00A3\u0094k`\u00C1\u00FB\u00E18\x15\u00B2**\u0092D\u00AB\u00D5J\u00F3<\u00AF<|\u00FC\u008CW\u009D\u008B\u00A3\u00C4\x0F\u00A5K\u00E2\u00F2\u00E25\u00DF\u0093\u00CFx\u00EF\u0093,\u00CB\u00EA\u00F7\x00\u00B2,\u00AB\u00F4\u00FB}n\x7F,Y\\\u00AFY\\o\u0098\u00A7k\x16\u00AB_\u00CC\u00D35\u00F3\u00D5\u0086d\u00B5&I7,\u00BF]1\x1E\u008Fq\u00CE\u00D5v\u00F3\u0097h6\u009B_\x1A\u008D\u0086U\u00AB\u00D5+\u0085\x05\u00FA\u00D3\u0089\u00E3\u00F8}\x14E\x02>J\u00DA\u00AF\u00F2\u00BF\u00D6\x1D\u00F95\u00BC<K\u00E0\u00DDo\x00\x00\x00\x00IEND\u00AEB`\u0082";
    var edit_media_icon   = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03\"iTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin=\"\u00EF\u00BB\u00BF\" id=\"W5M0MpCehiHzreSzNTczkc9d\"?> <x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \"> <rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"> <rdf:Description rdf:about=\"\" xmlns:xmp=\"http://ns.adobe.com/xap/1.0/\" xmlns:xmpMM=\"http://ns.adobe.com/xap/1.0/mm/\" xmlns:stRef=\"http://ns.adobe.com/xap/1.0/sType/ResourceRef#\" xmp:CreatorTool=\"Adobe Photoshop CS6 (Windows)\" xmpMM:InstanceID=\"xmp.iid:A25383D71A8D11E58817E6DFC8F2BEA1\" xmpMM:DocumentID=\"xmp.did:A25383D81A8D11E58817E6DFC8F2BEA1\"> <xmpMM:DerivedFrom stRef:instanceID=\"xmp.iid:A25383D51A8D11E58817E6DFC8F2BEA1\" stRef:documentID=\"xmp.did:A25383D61A8D11E58817E6DFC8F2BEA1\"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end=\"r\"?>\x10\u00FBm&\x00\x00\x02\u00B4IDATx\u00DA\u00A4SKHTQ\x18\u00FE\u00CE\u00B9\u00F7\u008E\u00CE\u008C3\u00CD\u0083\u00B4\u00D4l\u00D2\u00C86\u0089T\u008A\n\u009AL\u008C%\x15$\u0085-ZE\u00D1\u00B2]\u00EB \bWA\u00DB\u00A0\x16A\x11D\x11n*)\u00A7(\x02#{h\u008C&if\u00A2\u00E34\u00E8\u00E8<\u00BCwf\u00EE\u00BD\u00A7s\u008E\x0F\u00DC\u00FB\u00C3\x07\u00E7\u00FE\u00F7\u00FC\u00FF\u00F7\u00FD\u008FC\x18c\u00D8\u008E\u0091H$\u0082\u0093W\u00EF\u0085C5e\u0083\u00C9\u00BF\x13\u0098\u009B\u008EA)u\u00C0,\u00E4\u0091/\x10\u00D4\x1Dh\u0084oW\b6\u00E7\u00B1\u00D7\u00B9\x12\u0089\u00D5\u00E3/\u00EF^\u008E\u008A\u00B3J(E\u00CD\x1E\u00F7\u00E0\u00CC\u00D7\x01\u008C/\u00C6\x11:\u00DA\u008A\u00EA`\x00\x01\u00CD\u00C2|<\u0081\u0081\u00B7/\u00D0\u00B2\u00B7\x1E\u008Dm'6\x13\u00E4u\u00C7\u00A0 \x17gZ\u00E4L\u00D3\u00A3\x1F\x11[N\u00E2\u00F0\u00A9s\u00A8\u00DBY\x01?\u00B3\u00E1a\x14-U\u00E5\b\u00F7^D\u00FF\u009FiL\u008D\f\u00C1\u00E6\x19,\u00CB\u0096ID\u00E9\x024\u009FJ\u0095Nr\u00D95\u00AD]\u00B0u\u0086x\u00B6\u0088\u00DF:A,\x03\u008C\u00E5\b<6Ac{\x17F'\u00BE\u00C9\x04\x02&G>\u009F\u0097\u00A0\u0086\u009E\x0B\u00B9**\u00B1\u00DB]\x06\u008D\x15\u00E1R\u0080R\u00CA\u00F5q\u00B9\u00A9\"\u00C5\u008Anc\u009F/\x00\u00CD\x1F\u00C0\u00D2\u00BF9\b\x01\u0096\u00C5`\x18\u0086\u0084\u009A]5\u00E0\u00D14\x04Kl\x10\u00FE\u00D3\u00C9\u0083]\x1C\x1E\u00D5\x06\x05\u00C3\u00E7\u00B4\u008A\x12E\u0085K\u00D5`\u00996\x18gg<\u0081\u00AE\u00EB\u00B2\x14\u009AJgf\u00B2\x0B\u00F3p1\x0B\x0EU\u0085\u0098\u00AA\u00C5\u00D6dN\u00E6\x148\x15'\u009C\u00A4\u0080\u00C2b\x12\u00DE`%W\u00C0\u00A4\u0082B\u00A1 A\u008B\u0084\u00E8\u00D4\x11\u00C4l\u00EC;||\"n\u00AE\u0086R\x15\u00C9\u00A2\x13\u00AA\u00E6\u0085\u00DFa#\u00FDs\x18\u00D5\u00B5G@\b\u00D9\u009C\x7F&\u0093\u0091P5\x1E\u00D0\u00D0v\x1A_\u00DE<\u0080\u0091\u00CD\u00A1\u00B9\u00A9\x05\x05\u00A6\u00C1M\t\x185\u00F0~\u00A0\x1F\u00AA\u0091\x06\r\x1E\u0094\u00EC\u00C2\u0084\u00C2D\"!\u00A7\u00A0\u008ANZ\u0096\u0085\u00C8\u00D9K\x18\x19\u00FE\u0080G\u008F\u009F!\x18\u00F4s\u009F\u0089\u00E5\u0095,\u00AAj\x1B0=\u00FE\tg\u009A<\u00F85\x16Ee}\u00A7\u009C\u0084\x10#\u00CA%^\u00AF\x17\u00B7\u009FL\u00B0\u00F2\x1D\u009At\u0088\u00AC\u00A6i\u00CA=\x11K\u00B6\u00E6\x03^?\u00BD\u0083\u009E\u00EE\x0EL\u00CD.\u00C1\u00F0\u00B5\u00E1\u00FA\u0085\u00D0\u00DA\"m\u00D4$\x1A#\x17E\u00C8$\n\u00EF?\u00E5\u00DFX\u009F\u00BD\u008Dp\u00CF5\u00BCz7\u008CC\u00F5U\u00C0B\x14\x0E\u0087\u00C3+\u00DF\u0082Pp\u00E3\u00FE\u008F\u00B0\u00A6Q\u00B1\u009E2Hn\u00D9z\u00BDl\u00AB\u008F\u009F'\u0087\x1E\u00E2|w3\x16\u00E2\u0089b_\u00DF\u00AD\u00FD\u00AA\u00B8t\u00F3JC\u0094\u00F7\u0081l\u00F4C0\nS\x14EB\u008Ck\u00AB\u00AD\u00CC\u00F7>?\u00D6\u00D1\u00D9n\u00F2\u00BBd\u00BB\u00CF\u00F9\u00BF\x00\x03\x00\u00F21l\x02\u00BD)?\u00E5\x00\x00\x00\x00IEND\u00AEB`\u0082";
    var remove_media_icon = "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1F\u00F3\u00FFa\x00\x00\x00\x04gAMA\x00\x00\u00AF\u00C87\x05\u008A\u00E9\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x01\u00BBIDAT8\u00CB\u008D\u00931\u008BSQ\x10\u0085\u00CF\x0B\u00D1\u00C2(a\u008D\u00D8\u00C8\x16v*6\u00BA\u00D6q\x03B\u008AT\u00F9\x01\u00C2\u00A6\u0091\u00FC\u0084\u00B4v\u00A61\u00FFB\u00C8V\u009B.\x04\u00C1J\x03\u0092\u00DDB\u008BE\u00D6BVp\u00CB\u00D8\u0098\x17\u00DE\u009B3\u00C7\u00E2\u00BE\x17\u00DF\u00EAC20\u00CC\u00DC\u00CB\u00CC\u00C7\u0099\u00B9\u00DCh8\x1C\u009EK\u00DA\u0095t:\x18\f\x1E`\x0B\u00EB\u00F7\u00FB\u00EF\u00D24\u00DD'yZ\x01\u00B0\u00DB\u00E9t@\u00F2\x1E\u00B6\u00B48\u008E\u00F7{\u00BD\x1E\u00E28\u00BE_%y2\u0099L\x1E]\u00BD~;:Z\u00AC$\x00N \u008F\x0E\u00C0\x05\u0090\u00C0\u00F3\u00E6\u00B5\b\x00\u00D6\u00EB\u00F5\u00DB\u00D1h\u00F4\u00CC\u00CC\u00DEG\u0092\x00\x00G\u008B\u0095vj\x15@\u00A1I\x1E\x1A\u00A5\x10/~:\x0E\u009E\x06@\u00D1\u00AAyB\x0F\u00C5yC\u00EE\x12\u00E0\x0E\u0098\u0097\u008F\u00B3\x01\u00E4\u0085\u00CA$\u00BB\u00FF\x05a9a3\u00C2\u00E1\u0087\u0095n\u00DE\u00A8@\x02>\u009D/\u0083*\t$ :\u00CC\x017\u0087\x19`$^\x1D\u00DC\u008D.)0\x01,\u008Cpg\u00E7JP\u00E1\x02]p\u0086H\n_\x7F\u00A4%;`A6\u0095\u009D\x05w\x07\x1D \x1Dd\x00$\u00A9\u0097\x00\x04\\,\x1Dt\x0F\u00C5.8\x1D$\u00B2\u00BB?J\u00D2T\u00FF\x02\u008AO\u00F4\u00F2p)\u009Ao$\u00D3\x1Dn\n{\u00A0\u00C3\u00AC\x04P43\u00C1\n\u00927;\u00C8r3\u00FE\x1F\u0090&\u0084Yu\u00D3hT\u00B6L\u0087\x13\u0097\x15t\u00BB\u00DDE\u0092${$\u008F\u00A7\u00D3\u00E9\x13\x00H\u00CDq\u00F6\u00FD\x17R\x07h\x0E#`F8\u00C3\u00D3~|\u00F3\x02\u00B7^\x7F\u0091\u0099\u009D\u00A1\u00DDnk6\u009B\u00A9\u00D9lJ\x12\u00B6\u00F1F\u00A3\u00A1\u00F1x\u00ACZ\u00AD\u00A6\u00A8\u00D5j\x1D'I\u00F2\u0098\u00E4\u00C9|>\u00DF\u00DB\u00E67\u00D6\u00EB\u00F5\u00CFf\u00F6\u0090\u00E4\u00B7\u00DF\t%\u00A2`\x12\x0F\u00A4o\x00\x00\x00\x00IEND\u00AEB`\u0082";
    
    
    // Main menu -------------------------------------------------------------------------------------------------------------------------
    //  Window
    var main_menu  = new Window ('palette', "OneClick");
    main_menu.alignChildren = "top";
    
    // Window - Group Main
    var main_group           = main_menu.add ("group");
    main_group.orientation   = "row";    
    main_group.alignChildren = "top";
    

    // Window - Panel Group - actions
    var panel_actions           = main_group.add ('panel', undefined, texts["panel_actions"]);
    panel_actions.orientation   = "column";
    panel_actions.alignment     = "left";
    panel_actions.alignChildren = "top";
    
    
    // Window - Panel Group - tree custom medias
    var panel_tree           = main_group.add ('panel', undefined, texts["panel_tree"]);
    panel_tree.orientation   = "column";
    panel_tree.alignment     = "left";
    panel_tree.alignChildren = "top";
    tree_medias              = panel_tree.add ("treeview", [0, 0, 180, 218]);
    // Se rellena el árbol buscando los elementos que ya tienen las etiquetas apropiadas
    findMedias ();
    
    
    // Window - Group panel - relink resources
    /*
    var group_relink            = panel_actions.add ("group");
    group_relink.orientation    = "row";
    group_relink.alignment      = "left";
    var group_relink_button     = group_relink.add ("iconbutton", undefined, relink_icon);
    var group_relink_text       = group_relink.add ('statictext', undefined, texts["relink"]);  
    group_relink_button.onClick = function ()
    {
        var relink_dialog        = new Window      ("dialog", "Warning", undefined, { closeButton: false });
        var relink_panel         = relink_dialog.add ("panel", undefined, texts["relink_dialog_title"]);
        relink_panel.orientation = "column";
        relink_panel.alignment   = "left";
        var relink_texts         = texts["relink_dialog_texts"].split ("\n");        
        for (var l=0, maxL=relink_texts.length; l<maxL; l++) relink_panel.add ('statictext', undefined, relink_texts[l]);        
        
        var relink_group_buttons         = relink_dialog.add ("group");        
        relink_group_buttons.orientation = "row";
        relink_group_buttons.add ("button", undefined, "Accept", {name: "ok" });
        relink_group_buttons.add ("button", undefined, "Cancel", {name: "cancel"});

        if (relink_dialog.show () == 1) launchUndoScript (relinkProcess);
    };
    */

    
    // Window - Group panel - add media
    var group_add_media            = panel_actions.add ("group");
    group_add_media.orientation    = "row";
    group_add_media.alignment      = "left";
    var group_add_media_button     = group_add_media.add ("iconbutton", undefined, add_media_icon);
    var group_add_media_text       = group_add_media.add ('statictext', undefined, texts["add_media"]);  
    group_add_media_button.onClick = function () { addMedia (); };
    
    
    // Window - Group panel - edit media
    var group_edit_media            = panel_actions.add ("group");
    group_edit_media.orientation    = "row";
    group_edit_media.alignment      = "left";
    var group_edit_media_button     = group_edit_media.add ("iconbutton", undefined, edit_media_icon);
    var group_edit_media_text       = group_edit_media.add ('statictext', undefined, texts["edit_media"]);  
    group_edit_media_button.onClick = function () { editMedia (); };    

    // Window - Group panel - remove media
    var group_remove_media            = panel_actions.add ("group");
    group_remove_media.orientation    = "row";
    group_remove_media.alignment      = "left";    
    var group_remove_media_button     = group_remove_media.add ("iconbutton", undefined, remove_media_icon);
    var group_remove_media_text       = group_remove_media.add ('statictext', undefined, texts["remove_media"]);  
    group_remove_media_button.onClick = function () { removeMedia (); };
    

    // Window - Group panel - export image JPG
    var group_image_jpg            = panel_actions.add ("group");
    group_image_jpg.orientation    = "row";
    group_image_jpg.alignment      = "left";    
    var group_image_jpg_button     = group_image_jpg.add ("iconbutton", undefined, img_export_icon);
    var group_image_jpg_text       = group_image_jpg.add ('statictext', undefined, texts["group_image"] + " JPG");  
    group_image_jpg_button.onClick = function () { launchUndoScript (exportImageJPG); };
    
    // Window - Group panel - export image PNG
    var group_image_png            = panel_actions.add ("group");
    group_image_png.orientation    = "row";
    group_image_png.alignment      = "left";    
    var group_image_png_button     = group_image_png.add ("iconbutton", undefined, img_export_icon);
    var group_image_png_text       = group_image_png.add ('statictext', undefined, texts["group_image"] + " PNG");  
    group_image_png_button.onClick = function () { launchUndoScript (exportImagePNG); };
    
    // Window - Document panel - Export
    var document_export            = panel_actions.add ("group");
    document_export.orientation    = "row";
    document_export.alignment      = "left";
    var document_export_button     = document_export.add ("iconbutton", undefined, doc_export_icon);    
    var document_export_text       = document_export.add ('statictext', undefined, texts["document_export"]);   
    document_export_button.onClick = function ()
    {
        $.writeln ("Export ini");
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;        
        log_file = new File (log_file_path);
        log_file.open       ("w");        
        createFolders       ();
        
        exportDocumentText ();
        
        log_file.close ();        
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;       
        $.writeln ("Export end");            
    };
    
    // Launch menu
    main_menu.show ();
}



function createFolders ()
{
    // Se crea la carpeta de exportación si no existe.
    var dir = new Folder (export_folder);
    if (!dir.exists) dir.create ();
    
    // Se crea la carpeta de exportación de imágenes si no existe.
    dir = new Folder (export_folder + images_folder);
    if (!dir.exists) dir.create ();
}



function linksAlert ()
{
    // LinkStatus.NORMAL / LinkStatus.LINK_OUT_OF_DATE / LinkStatus.LINK_MISSING / LinkStatus.LINK_EMBEDDED / LinkStatus.LINK_INACCESSIBLE
    var link_alert  = [];
    var links       = app.activeDocument.links;
    
    for (var l=0, maxL=links.length; l<maxL; l++)
    {  
        switch (links[l].status)
        {
            case LinkStatus.NORMAL:
            case LinkStatus.LINK_EMBEDDED: break;
            
            case LinkStatus.LINK_OUT_OF_DATE:  link_alert.push (links[l].filePath + " is out of date.");  break;
            case LinkStatus.LINK_MISSING:      link_alert.push (links[l].filePath + " is missing.");      break;
            case LinkStatus.LINK_INACCESSIBLE: link_alert.push (links[l].filePath + " is inaccesible.");  break;
        }
    }
    
    if (link_alert.length > 0)
    {
        var link_dialog    = new Window      ("dialog", "Warning", undefined, { closeButton: false });
        var link_panel     = link_dialog.add ("panel", undefined, "Links error:");
        var list           = link_panel .add ("listbox", undefined, link_alert);
        list.preferredSize = [600,200];
        link_dialog.add  ("button", undefined, "Close", {name: "ok" });
        link_dialog.show ();
    }
}



function hasAllFontsInstalled ()
{
    var usedFonts     = app.activeDocument.fonts;
    var all_installed = true;

    for (var i=0, iMax=usedFonts.length; i<iMax && all_installed; i++)
    {
        if (usedFonts[i].status != FontStatus.INSTALLED)
        {
            all_installed = false;       
            //$.writeln (usedFonts[i].status);
            //$.writeln (usedFonts[i].name);
            //$.writeln (" ");
        }
    }
    
    if (!all_installed) 
    {
        var fonts_dialog          = new Window      ("dialog", "Warning", undefined, { closeButton: false });
        var fonts_panel           = fonts_dialog.add ("panel", undefined, "Fonts error:");
        fonts_panel.orientation   = "column";
        fonts_panel.alignChildren = "left";
        var font_texts            = texts["alert_fonts"].split ("\n");
        
        for (var l=0, maxL=font_texts.length; l<maxL; l++) fonts_panel .add  ('statictext', undefined, font_texts[l]);
        
        fonts_dialog.add  ("button", undefined, "Close", {name: "ok" });
        fonts_dialog.show ();
    }
    
    return all_installed;
    
    /* Localiza fuentes no encontradas y las cambia
    var usedFonts    = app.activeDocument.fonts;
    var missingFonts = Array ();
    
    for (var i = 0; i < usedFonts.length; i++)
    {
        if (usedFonts[i].status != FontStatus.INSTALLED) missingFonts.push (usedFonts[i]);
    }
    
    app.findTextPreferences             = NothingEnum.nothing;
    app.findTextPreferences.appliedFont = missingFonts[0];
    var missingFind                     = app.activeDocument.findText ();
    
    app.findTextPreferences               = NothingEnum.nothing;
    app.changeTextPreferences             = NothingEnum.nothing;
    app.findTextPreferences.appliedFont   = missingFonts[0];
    app.changeTextPreferences.appliedFont = "Myriad Pro";
    app.activeDocument.changeText ();
    */
}



function editMediaPopup (current_media_data)
{
//$.writeln ("editMediaPopup INI ");

    var curr_name       = getSafeTimeHash (); // Cadena aleatoria para identificar el grupo
    var curr_type       = 0;
    var curr_title      = "Title";
    var curr_thumb      = "";
    var curr_href       = "";
    var curr_visibility = 0;

    if (current_media_data !== undefined)
    {
        curr_name       = current_media_data.name;
        curr_type       = (current_media_data.type == 'figure') ? 0 : 1;
        curr_title      = current_media_data.title;
        curr_thumb      = current_media_data.thumb;
        curr_href       = current_media_data.href;
        curr_visibility = parseInt (current_media_data.visibility);
    }

    // Dialogo para especificar exportación del grupo
    var html_window                      = new Window ("dialog", "HTML options", undefined, { closeButton: false });
    var html_media                       = html_window.add ("group");
    html_media.orientation               = "column";
    
    var name_media                       = html_media.add ("panel", undefined, "Media name");
    name_media.orientation               = "row";
    name_media.alignment                 = "left";    
    var name_input                       = name_media.add ("edittext", undefined, curr_name);
    name_input.characters                = 100;
    
    var type_media                       = html_media.add ("panel", undefined, "Type");
    type_media.orientation               = "row";
    type_media.alignment                 = "left";    
    var type_figure                      = type_media.add ("radiobutton", undefined, "figure");
    var type_multimedia                  = type_media.add ("radiobutton", undefined, "multimedia");
    type_media.children[curr_type].value = true;
    
    var title_media                      = html_media.add ("panel", undefined, "Title");
    title_media.orientation              = "row";
    title_media.alignment                = "left";    
    var title_input                      = title_media.add ("edittext", undefined, curr_title);
    title_input.characters               = 100;

    var thumb_media                      = html_media.add ("panel", undefined, "Thumbnail (Path from root)");
    thumb_media.orientation              = "row";
    thumb_media.alignment                = "left";    
    var thumb_input                      = thumb_media.add ("edittext", undefined, curr_thumb);
    thumb_input.characters               = 100;
    
    var href_media                       = html_media.add ("panel", undefined, "Link reference (Path from file in attribute 'href' of tag <a>)");
    href_media.orientation               = "row";
    href_media.alignment                 = "left";    
    var href_input                       = href_media.add ("edittext", undefined, curr_href);
    href_input.characters                = 100;

    var visibility_media                 = html_media.add ("panel", undefined, "Visibility");
    visibility_media.orientation         = "row";
    visibility_media.alignment           = "left";
    var vivibility_all                   = visibility_media.add ("radiobutton", undefined, "TOC, page and module");
    var visibility_toc                   = visibility_media.add ("radiobutton", undefined, "TOC and module");
    var visibility_page                  = visibility_media.add ("radiobutton", undefined, "Page and module");
    var visibility_module                = visibility_media.add ("radiobutton", undefined, "Only module");

    visibility_media.children[curr_visibility].value = true;

    var buttons         = html_media.add ("group");
    buttons.orientation = "row";
    buttons.add ("button", undefined, "Accept", {name: "ok"});
    buttons.add ("button", undefined, "Cancel", {name: "cancel"});
    
    
    // Según el tipo muestro más o menos opciones
    if (curr_type == 1)
    {
        thumb_media     .hide ();
        href_media      .hide ();
        visibility_media.hide ();
    }

    type_figure.onClick = function (e)
    {
        thumb_media     .show ();
        href_media      .show ();
        visibility_media.show ();
    };
    
    type_multimedia.onClick = function (e)
    {
        thumb_media     .hide ();
        href_media      .hide ();
        visibility_media.hide ();
    };


    // Resultado de la ventana (aceptar = 1)
    if (html_window.show () == 1)
    {
        // Obtener datos del diálogo
        var media_name = name_input.text;
        // El nombre del media es obligatorio
        if (media_name == "") return;
        
        // Comprobar que no exista un grupo con el mismo nombre
        for (var n=0, nMax=tree_medias.items.length; n<nMax; n++)
        {
            if (tree_medias.items[n].text == media_name)
            {
                var used_window       = new Window ("dialog", "Add media warning:", undefined, { closeButton: false });
            
                var used_text         = used_window.add ("media");
                used_text.orientation = "column";
                used_text.add ('statictext', undefined, "The media name '" + media_name + "' is already in use.");        
                                
                var buttons           = used_window.add ("media");
                buttons.orientation   = "row";
                buttons.add ("button", undefined, "Accept", {name: "ok"});

                used_window.show ();
                
                return;                    
            }
        }        
        
        var type       = (type_media.children[0].value === true) ? 'figure'         : 'multimedia';
        var title      = (title_input.text != "")                ? title_input.text : 'Title';
        var thumb      = "";            
        var href       = "";
        var visibility = "0"; // 0 -> all, 1 -> TOC and Modulde, 2, Page and Module, 3 -> only Module

        if (type_media.children[0].value === true)
        {                
            thumb = thumb_input.text != "" ? thumb_input.text : '';            
            href  = href_input.text  != "" ? href_input.text  : '';
            
            if      (visibility_media.children[1].value === true) visibility = "1";
            else if (visibility_media.children[2].value === true) visibility = "2";
            else if (visibility_media.children[3].value === true) visibility = "3";
        }
        
        current_media_data            = {};
        current_media_data.name       = media_name;
        current_media_data.type       = type;
        current_media_data.title      = title;
        current_media_data.thumb      = thumb;
        current_media_data.href       = href;
        current_media_data.visibility = visibility;
        
        return current_media_data;
    }
    else return null;

//$.writeln ("editMediaPopup END");    
}



function addMedia ()
{
//$.writeln ("addMedia INI " + app.selection.length);    
    if (app.selection.length == 1)
    {
        // Elementos seleccionados.
        var selected    = new Array;
        selected        = app.selection;
        selected_length = selected.length;
        
        for (var s=0; s<selected_length; s++)
        {
            if (selected[s].extractLabel ("oc_media") != "")
            {
                var used_window       = new Window ("dialog", "Add media warning:", undefined, { closeButton: false });
                
                var used_text         = used_window.add ("group");
                used_text.orientation = "column";
                used_text.add ('statictext', undefined, "Alguno de los elementos seleccionados, pertenece a otro grupo...");        
                                
                var buttons           = used_window.add ("group");
                buttons.orientation   = "row";
                buttons.add ("button", undefined, "Accept", {name: "ok"});

                used_window.show ();
                
                return;
            }
        }
        
        var media_data = editMediaPopup ();
        if (media_data != null)
        {
            // Añadir etiquetas a los elementos y el grupo
            var new_media = tree_medias.add ("node", media_data.name);
            
            for (var s=0; s<selected_length; s++)
            {
                selected[s].insertLabel ("oc_media", media_data.name);                 
                selected[s].insertLabel ("oc_type",  media_data.type);
                if (media_data.title != "")  selected[s].insertLabel ("oc_title", media_data.title);
                if (media_data.thumb != "")  selected[s].insertLabel ("oc_thumb", media_data.thumb);
                if (media_data.href  != "")  selected[s].insertLabel ("oc_href",  media_data.href);
                selected[s].insertLabel ("oc_visibility", media_data.visibility);

                //new_media.add ("item", "Item " + s);
            }
            
            new_media.expanded = false;

//$.writeln ("addMedia - try save");
            // Se guarda el documento.
            //app.activeDocument.save ();
//$.writeln ("addMedia - saved");
        }
    }
    else
    {
        var used_window       = new Window ("dialog", "Add media warning:", undefined, { closeButton: false });
        var used_text         = used_window.add ("group");
        used_text.orientation = "column";
        used_text.add ('statictext', undefined, "Select one and only one item.");
                        
        var buttons           = used_window.add ("group");
        buttons.orientation   = "row";
        buttons.add ("button", undefined, "Accept", {name: "ok"});

        used_window.show ();        
    }        
//$.writeln ("addMedia END");        
}



function removeMedia ()
{
//$.writeln ("removeMedia INI");

    if (tree_medias && tree_medias.selection && tree_medias.selection.type == "node")
    {
        var delete_media_name = tree_medias.selection.text;
        var media_items_len   = tree_medias.selection.items.length;

        // Buscar y eliminar las etiquetas requeridas
        var all_items = app.activeDocument.allPageItems;
        
        for (var i=0, max=all_items.length; i<max; i++)
        {
            var name = all_items[i].extractLabel ("oc_media");
            
            if (name == delete_media_name)
            {
                all_items[i].insertLabel ("oc_media",      "");                 
                all_items[i].insertLabel ("oc_type",       "");
                all_items[i].insertLabel ("oc_title",      "");
                all_items[i].insertLabel ("oc_thumb",      "");
                all_items[i].insertLabel ("oc_href",       "");
                all_items[i].insertLabel ("oc_visibility", "");
                
                media_items_len--;
                //$.writeln ("media_items_len " + media_items_len); // Creo que puedo usarlo para terminar de buscar cuando llegue a 0, pero de momento por si acaso no lo hago...
            }
        }        

        tree_medias.remove (tree_medias.selection);
        
//$.writeln ("removeMedia - try save");
            // Se guarda el documento.
            //app.activeDocument.save ();
//$.writeln ("removeMedia - saved");
    }
    else
    {
        var used_window       = new Window ("dialog", "Remove media warning:", undefined, { closeButton: false });
        
        var used_text         = used_window.add ("group");
        used_text.orientation = "column";
        used_text.add ('statictext', undefined, "No hay grupo seleccionado.");        
                        
        var buttons           = used_window.add ("group");
        buttons.orientation   = "row";
        buttons.add ("button", undefined, "Accept", {name: "ok"});

        used_window.show ();                
    }

//$.writeln ("removeMedia END");
}



function editMedia ()
{
//$.writeln ("editMedia INI");

    if (tree_medias && tree_medias.selection && tree_medias.selection.type == "node")
    {
        var tree_node       = tree_medias.selection;
        var edit_media_name = tree_node.text;

        // Buscar grupo a mostrar
        var all_items = app.activeDocument.allPageItems;
        var media_item = undefined;

        for (var i=0, max=all_items.length; i<max; i++)
        {
            if (edit_media_name == all_items[i].extractLabel ("oc_media"))
            {
                media_item = all_items[i];
                media_item.select ();

                app.activeWindow.activePage = media_item.parentPage;
                app.activeWindow.zoom (ZoomOptions.fitPage);
                
                break;
            }
        }
        
        if (media_item !== undefined)
        {
            var media_pre_data        = {};
            media_pre_data.name       = media_item.extractLabel ("oc_media");
            media_pre_data.type       = media_item.extractLabel ("oc_type");
            media_pre_data.title      = media_item.extractLabel ("oc_title");
            media_pre_data.thumb      = media_item.extractLabel ("oc_thumb");
            media_pre_data.href       = media_item.extractLabel ("oc_href");
            media_pre_data.visibility = media_item.extractLabel ("oc_visibility");

            var media_pos_data = editMediaPopup (media_pre_data);
            if (media_pos_data != null)
            {
                // Añadir etiquetas a los elementos y el grupo
                tree_node.text = media_pos_data.name;

                media_item.insertLabel ("oc_media", media_pos_data.name);                 
                media_item.insertLabel ("oc_type",  media_pos_data.type);
                media_item.insertLabel ("oc_title", media_pos_data.title);
                if (thumb      != "")  media_item.insertLabel ("oc_thumb",      media_pos_data.thumb);
                if (href       != "")  media_item.insertLabel ("oc_href",       media_pos_data.href);
                if (visibility != "0") media_item.insertLabel ("oc_visibility", media_pos_data.visibility);
                
                //$.writeln ("addMedia - try save");
                // Se guarda el documento.
                //app.activeDocument.save ();
                //$.writeln ("addMedia - saved");     
            }
        }
    }
    else
    {
        var used_window       = new Window ("dialog", "Edit media warning:", undefined, { closeButton: false });        
        var used_text         = used_window.add ("group");
        used_text.orientation = "column";
        used_text.add ('statictext', undefined, "No hay grupo seleccionado.");        
                        
        var buttons           = used_window.add ("group");
        buttons.orientation   = "row";
        buttons.add ("button", undefined, "Accept", {name: "ok"});

        used_window.show ();                
    }

//$.writeln ("editMedia END");
}



function findMedias ()
{
//$.writeln ("findMedias INI");
    // Buscar en todos los items la etiqueta 'oc_media' y quedarnos con su índice
    var all_items    = app.activeDocument.allPageItems;
    var saved_medias = {};
    
    for (var i=0, max=all_items.length; i<max; i++)
    {
        var name = all_items[i].extractLabel ("oc_media");
        
        if (name != "")
        {
            if (!saved_medias.hasOwnProperty (name)) saved_medias[name] = new Array ();
            saved_medias[name].push (i);
        }
    }
    
    // Regenerar los grupos en el árbol
    for (var name in saved_medias)
    {
        //var new_media = tree_medias.add ("node", all_items[saved_medias[name][0]].extractLabel ("oc_media"));        
        var new_media = tree_medias.add ("node", name);
        
        //for (var i=0, iMax=saved_medias[name].length; i<iMax; i++) new_media.add ("item", "Item " + i);
        
        new_media.expanded = false;
    }
    
//$.writeln ("findMedias END");    
}



function exportMedia (media_name)
{
//$.writeln ("exportMedia INI");

    var all_items     = app.activeDocument.allPageItems;    
    var media_items   = new Array ();
    var first_element = true;
    var type          = "";
    var title         = "";
    var thumb         = "";
    var href          = "";
    var visibility    = "";
    var image_file    = generateImageFile ("png");
    var file_name     = decodeURI (image_file.name);
    var media_bounds  = [];

    for (var i=0, max=all_items.length; i<max; i++)
    {
        var name = all_items[i].extractLabel ("oc_media");
        
        if (name == media_name)
        {
            media_items.push (all_items[i]);
            
            if (first_element)
            {
                first_element = false;
                
                type       = all_items[i].extractLabel ("oc_type");
                title      = all_items[i].extractLabel ("oc_title");
                thumb      = all_items[i].extractLabel ("oc_thumb");
                href       = all_items[i].extractLabel ("oc_href");
                visibility = all_items[i].extractLabel ("oc_visibility");
            }
        }
    }

    if (media_items.length > 1)
    {
        /*
        // Se obtienen los límites visibles del grupo y se añaden los elementos a la selección actual (al desagrupar todo se perdío)
        var y1, x1, y2, x2;

        for (var i=0, iMax=media_items.length; i<iMax; i++)
        {
            var visibleBounds = media_items[i].visibleBounds;

            if ((y1 === undefined) || (y1 > visibleBounds[0])) y1 = visibleBounds[0];
            if ((x1 === undefined) || (x1 > visibleBounds[1])) x1 = visibleBounds[1];
            if ((y2 === undefined) || (y2 < visibleBounds[2])) y2 = visibleBounds[2];
            if ((x2 === undefined) || (x2 < visibleBounds[3])) x2 = visibleBounds[3];
        }

        // Se crea un rectangulo que incluye todos los elementos a exportar (sino algunas veces parte de la imágen se pierde).
        media_bounds       = [y1 - 0.1, x1 - 0.1, y2 + 0.1, x2 + 0.1];
        var mediaRectangle = app.activeWindow.activePage.rectangles.add ({ geometricBounds:media_bounds, strokeColor:"None", fillColor:"None" });
        media_items.push (mediaRectangle);

        //unGroup ();
        
        // Group the items
        var grouped = app.activeWindow.activePage.groups.add (media_items);
        exportPNG (grouped, image_file, image_export_dpi, 2);

        grouped.ungroup       ();
        groupRectangle.remove ();
        */
    }
    else
    {
        var media_bounds = media_items[0].visibleBounds;
        
        // Turn off screen redraw while the script runs
        var current_doc                    = app.activeDocument;
        var current_redraw_setting         = app.scriptPreferences.enableRedraw;
        app.scriptPreferences.enableRedraw = false;
        // Set the measurement system to points and the origin to page
        var current_horiz                                      = current_doc.viewPreferences.horizontalMeasurementUnits;
        var current_vert                                       = current_doc.viewPreferences.verticalMeasurementUnits;
        var current_origin                                     = current_doc.viewPreferences.rulerOrigin;
        current_doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
        current_doc.viewPreferences.verticalMeasurementUnits   = MeasurementUnits.points;
        current_doc.viewPreferences.rulerOrigin                = RulerOrigin.PAGE_ORIGIN;
        current_doc.zeroPoint                                  = [0,0];


        // Se obtiene la página que contiene el item a exportar
        //var page = app.activeDocument.selection[0].parentPage;
        var page = media_items[0].parentPage;        
        var name = "" + page.name;

        // Se aplican las preferencias para exportar la página entera como PNG
        with (app.pngExportPreferences)
        {
            antiAlias             = true;  
            exportResolution      = image_export_dpi;  
            embedColorProfile     = true;          
            exportingSpread       = false;  
            PNGColorSpace         = PNGColorSpaceEnum.RGB;          
            PNGQuality            = PNGQualityEnum.MAXIMUM; // máximo, pero si no es necesario se puede variar
            simulateOverprint     = false;  
            transparentBackground = true;  
            useDocumentBleeds     = false;  
                        
            pngExportRange        = PNGExportRangeEnum.EXPORT_RANGE;
            pageString	          = name;
        }
        
        // Se exporta la imágen de toda la página
        app.activeDocument.exportFile (ExportFormat.PNG_FORMAT, image_file, false);

        // Se obtienen los limites de le página y del rectángulo a recortar        
        var page_size = page.bounds;
        page_size     = [Math.round (page_size[3] - page_size[1]), Math.round (page_size[2] - page_size[0])];

        //var rectangle = app.activeDocument.selection[0].visibleBounds;
        var vb        = media_items[0].visibleBounds;
        var rectangle = [vb[0],vb[1],vb[2],vb[3]];

        // Limitamos el rectángulo al contenido de la página - TopLeft(y1,x1), BottomRight(y2,x2)
        rectangle[0] = Math.floor (rectangle[0]); // y1
        rectangle[1] = Math.floor (rectangle[1]); // x1
        rectangle[2] = Math.ceil  (rectangle[2]); // y2
        rectangle[3] = Math.ceil  (rectangle[3]); // x2

        for (var r=0; r<4; r++)
        {
            var val = rectangle[r];
            
            if      (val < 0)                           rectangle[r] = 0;
            else if ((r % 2 == 0) && (val > page_size[1])) rectangle[r] = page_size[1];
            else if ((r % 2 != 0) && (val > page_size[0])) rectangle[r] = page_size[0];
        }

        // En base a los valores originales y1,x1,y2,x2 los cambiamos para obtener x1,y1,w,h
        rectangle[2] = rectangle[2] - rectangle[0];
        rectangle[3] = rectangle[3] - rectangle[1];    
        var aux      = rectangle[0];
        rectangle[0] = rectangle[1];
        rectangle[1] = aux;
        aux          = rectangle[2];
        rectangle[2] = rectangle[3];
        rectangle[3] = aux;
        
        // Se genera un 'bach' que ejecutará un jar para recortar de la imágen exportada el rectángulo
        var batch_file   = new File (export_folder + getSafeTimeHash () + ".bat");
        var scriptFolder = (new File ($.fileName)).parent.fsName;
        
        // El 'bach' le enviará al 'jar'  la "ruta a la imágen", el "ancho,alto" de la página en indesign y los valores "x1,y1,w,h" del rectángulo
        // El 'jar' con esos datos extrapolará los nuevos 'x1','y1', 'w' y 'h' del recorte y sobreescribirá la imágen.
        // Finalmente el 'batch' se autoborrará
//$.writeln ("img: " + image_file.name + "  -  ps: " + page_size + "  -  area: " + rectangle);        

        batch_file.open    ("w");
        batch_file.writeln ("@echo OFF");
        batch_file.writeln ('java -jar "' + scriptFolder + '\\SlicePNG.jar" "' + image_file.fsName + '" "' + page_size + '" "'+ rectangle +'"');        
        batch_file.writeln ('( del /q /f "%~f0" >nul 2>&1 & exit /b 0  )'); // Elimina el propio batch
        batch_file.writeln ('pause');
        //$.sleep (100); //puede que pare lo suficiente para que el fichero esté guardado... pero supongo que despues del close...
        if (batch_file.close ()) batch_file.execute ();
        else
        {
            $.writeln        ("Batch_file for " + image_file.name + " failed !!!");        
            log_file.writeln ("Batch_file for " + image_file.name + " failed !!!");
        }


        // Return the measurement system and origin to the way it was
        current_doc.viewPreferences.horizontalMeasurementUnits = current_horiz;
        current_doc.viewPreferences.verticalMeasurementUnits   = current_vert;
        current_doc.viewPreferences.rulerOrigin                = current_origin;

        // Turn screen redraw back to what it was
        app.scriptPreferences.enableRedraw = current_redraw_setting;        
    }
    
//$.writeln ("exportMedia END");    
    
    return { type:type, title:title, thumb:thumb, visibility:visibility, href:href, file_name:file_name, media_bounds:media_bounds };
    // Obtener dommy de los valores de las etiquetas
    /*var dom = dommy ();
    
    if (type == "figure")
    {
        // Figure
        var fig_attrs = new Array ();
        if (title != "") fig_attrs['data-title'] = title;
        if (thumb != "") fig_attrs['data-thumb'] = thumb;
        
        // 0 -> all, 1 -> TOC and Modulde, 2, Page and Module, 3 -> only Module
        if      (visibility == "1") fig_attrs['style']       = "display:none;";
        else if (visibility == "2") fig_attrs['data-hidden'] = "";
        else if (visibility == "3")
        {
            fig_attrs['style']       = "display:none;";
            fig_attrs['data-hidden'] = "";
        }
        
        var figure_node = dom.node ("figure", undefined, fig_attrs).append ();
        
        // Link
        var link_attrs     = new Array ();
        link_attrs["href"] = href;        
        var link_node      = figure_node.node ("a", undefined, link_attrs).append ();
        
        // Image
        var img_attrs = new Array ();
        if (title != "") img_attrs["alt"] = title;
        img_attrs["src"] = images_folder + file_name;
        link_node.node ("img", undefined, img_attrs).append ();
    }
    else
    {
        // Multimedia
        var multimedia_node = dom.node ("multimedia").append ();
        
        // Image
        var img_attrs = new Array ();
        if (title != "") img_attrs["alt"] = title;
        img_attrs["src"] = images_folder + file_name;
        multimedia_node.node ("img", undefined, img_attrs).append ();        
    }
    
//$.writeln (dom.first ().toString ());
$.writeln ("exportMedia END");        

    return dom.first ();*/
}










function exportFrame ()
{
//$.writeln ("exportMedia INI");

    var frame_item   = app.selection[0];
    var image_file   = generateImageFile ("png");
    var file_name    = decodeURI (image_file.name);
    
    // Turn off screen redraw while the script runs
    var current_doc                    = app.activeDocument;
    var current_redraw_setting         = app.scriptPreferences.enableRedraw;
    app.scriptPreferences.enableRedraw = false;
    // Set the measurement system to points and the origin to page
    var current_horiz                                      = current_doc.viewPreferences.horizontalMeasurementUnits;
    var current_vert                                       = current_doc.viewPreferences.verticalMeasurementUnits;
    var current_origin                                     = current_doc.viewPreferences.rulerOrigin;
    current_doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
    current_doc.viewPreferences.verticalMeasurementUnits   = MeasurementUnits.points;
    current_doc.viewPreferences.rulerOrigin                = RulerOrigin.PAGE_ORIGIN;
    current_doc.zeroPoint                                  = [0,0];


    // Se obtiene la página que contiene el item a exportar
    //var page = app.activeDocument.selection[0].parentPage;
    var page = frame_item.parentPage;        
    var name = "" + page.name;

    // Se aplican las preferencias para exportar la página entera como PNG
    with (app.pngExportPreferences)
    {
        antiAlias             = true;  
        exportResolution      = image_export_dpi;  
        embedColorProfile     = true;          
        exportingSpread       = false;  
        PNGColorSpace         = PNGColorSpaceEnum.RGB;          
        PNGQuality            = PNGQualityEnum.MAXIMUM; // máximo, pero si no es necesario se puede variar
        simulateOverprint     = false;  
        transparentBackground = true;  
        useDocumentBleeds     = false;  
                    
        pngExportRange        = PNGExportRangeEnum.EXPORT_RANGE;
        pageString	          = name;
    }
    
    // Se exporta la imágen de toda la página
    app.activeDocument.exportFile (ExportFormat.PNG_FORMAT, image_file, false);

    // Se obtienen los limites de le página y del rectángulo a recortar        
    var page_size = page.bounds;
    page_size     = [Math.round (page_size[3] - page_size[1]), Math.round (page_size[2] - page_size[0])];

    //var rectangle = app.activeDocument.selection[0].visibleBounds;
    var vb        = frame_item.visibleBounds;
    var rectangle = [vb[0],vb[1],vb[2],vb[3]];

    // Limitamos el rectángulo al contenido de la página - TopLeft(y1,x1), BottomRight(y2,x2)
    rectangle[0] = Math.floor (rectangle[0]); // y1
    rectangle[1] = Math.floor (rectangle[1]); // x1
    rectangle[2] = Math.ceil  (rectangle[2]); // y2
    rectangle[3] = Math.ceil  (rectangle[3]); // x2

    for (var r=0; r<4; r++)
    {
        var val = rectangle[r];
        
        if      (val < 0)                           rectangle[r] = 0;
        else if ((r % 2 == 0) && (val > page_size[1])) rectangle[r] = page_size[1];
        else if ((r % 2 != 0) && (val > page_size[0])) rectangle[r] = page_size[0];
    }

    // En base a los valores originales y1,x1,y2,x2 los cambiamos para obtener x1,y1,w,h
    rectangle[2] = rectangle[2] - rectangle[0];
    rectangle[3] = rectangle[3] - rectangle[1];    
    var aux      = rectangle[0];
    rectangle[0] = rectangle[1];
    rectangle[1] = aux;
    aux          = rectangle[2];
    rectangle[2] = rectangle[3];
    rectangle[3] = aux;
    
    // Se genera un 'bach' que ejecutará un jar para recortar de la imágen exportada el rectángulo
    var batch_file   = new File (export_folder + getSafeTimeHash () + ".bat");
    var scriptFolder = (new File ($.fileName)).parent.fsName;
    
    // El 'bach' le enviará al 'jar'  la "ruta a la imágen", el "ancho,alto" de la página en indesign y los valores "x1,y1,w,h" del rectángulo
    // El 'jar' con esos datos extrapolará los nuevos 'x1','y1', 'w' y 'h' del recorte y sobreescribirá la imágen.
    // Finalmente el 'batch' se autoborrará
//$.writeln ("img: " + image_file.name + "  -  ps: " + page_size + "  -  area: " + rectangle);        

    batch_file.open    ("w");
    batch_file.writeln ("@echo OFF");
    batch_file.writeln ('java -jar "' + scriptFolder + '\\SlicePNG.jar" "' + image_file.fsName + '" "' + page_size + '" "'+ rectangle +'"');        
    batch_file.writeln ('( del /q /f "%~f0" >nul 2>&1 & exit /b 0  )'); // Elimina el propio batch
    batch_file.writeln ('pause');
    //$.sleep (100); //puede que pare lo suficiente para que el fichero esté guardado... pero supongo que despues del close...
    if (batch_file.close ()) batch_file.execute ();
    else
    {
        $.writeln        ("Batch_file for " + image_file.name + " failed !!!");        
        log_file.writeln ("Batch_file for " + image_file.name + " failed !!!");
    }


    // Return the measurement system and origin to the way it was
    current_doc.viewPreferences.horizontalMeasurementUnits = current_horiz;
    current_doc.viewPreferences.verticalMeasurementUnits   = current_vert;
    current_doc.viewPreferences.rulerOrigin                = current_origin;

    // Turn screen redraw back to what it was
    app.scriptPreferences.enableRedraw = current_redraw_setting;        
}












//   !!!  Funciona únicamente con libros Edelvives bachillerato 2015  !!!
// Esta es la primera iteración de la automatización del export indesign->html. Exporta los títulos, epígrafes, texto general, bolos, vinetas y otras listas.
// Los elementos HTML resultantes tienen la mayoría de las clases adecuadas para ser estilizados por "book.css" utilizado hasta ahora para hacer las demos.
// Tambiñen agrega tags <strong> e <i> donde sea necesario.
function exportDocumentText ()
{
    var popup_exportation_title = texts["info"];
    var popup_exportation_text  = texts["exporting_document_done"];
    
var export_progress_window  = new Window ('palette');
export_bar = export_progress_window.add ('progressbar', undefined, 0, 100);
export_bar.preferredSize.width = 300;
export_progress_window.show();


    var current_undo_document = getUndoHistoryLength ();
    
    try
    {
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;    
        
        app.findGrepPreferences   = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        app.findTextPreferences   = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;

        //baseExport defined in baseExport.js
        //app.doScript (doLinks, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.FAST_ENTIRE_SCRIPT, texts["undo_script_string"]);
        //linksAlert ();
        $.writeln ("exportDocumentText baseExport ini");
        baseExport  ();
        $.writeln ("exportDocumentText baseExport end");

        //app.activeDocument.undo ();

        app.findGrepPreferences   = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;
        app.findTextPreferences   = NothingEnum.nothing;
        app.changeTextPreferences = NothingEnum.nothing;
        
        app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
    }
    catch (error)
    {
        var file_error = error.fileName;
        file_error     = file_error.substr (file_error.lastIndexOf ('/') + 1);
        popup_exportation_title = texts["warning"];
        popup_exportation_text  = texts["exporting_document_fail"] + "\n" + error.message + "\n" + file_error + " - " + error.line;
    }
    finally
    {
        export_progress_window.close ();
        showPopup (popup_exportation_title, popup_exportation_text);
        
        if (current_undo_document === undefined || current_undo_document < 0) current_undo_document = 0;        
        undoToLength (current_undo_document);
    }
}


function launchUndoScript (script_function)
{
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
    log_file = new File (log_file_path);
    log_file.open       ("w");
    createFolders ();
        
    app.doScript (script_function, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, texts["undo_script_string"]);
    app.activeDocument.undo ();
    
    log_file.close ();
    
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
}



function exportImageJPG () { exportImage ("jpg"); }


function exportImagePNG () { exportImage ("png"); }


function exportImage (image_type)
{
    var progress_window              = new Window ('palette', texts["exporting_image"]);
    var progress_lenght              = 100;
    var progress_bar                 = progress_window.add ('progressbar', undefined, 0, progress_lenght);
    progress_bar.preferredSize.width = 300;
    progress_window.show ();
 
    try
    {
        progress_bar.value = 10; // ---- Aumentar progreso
        
        if (app.selection.length == 1)
        {
            progress_bar.value = 35; // ---- Aumentar progreso
                        
            // Se almacena el elemento seleccionado.
            var selected_item = app.selection[0];

            progress_bar.value = 70; // ---- Aumentar progreso
            
            var file_name = "";
            
            if (image_type == "jpg")
            {
                var image_file = generateImageFile ("jpg");
                file_name      = decodeURI (image_file.name)
                exportJPG (selected_item, image_file, image_export_dpi, image_export_quality);
            }
            else
            {
                var image_file = generateImageFile ("png");
                file_name      = decodeURI (image_file.name)
                exportPNG (selected_item, image_file, image_export_dpi, image_export_quality);
            }
            
            // Se obtiene el texto HTML para incluir la imágen.
            generateImageHTMLClipboard (file_name);
            
            progress_bar.value = 100; // ---- Aumentar progreso
            
            showPopup (texts["info"], texts["exporting_image_done"]);            
        }
        else if (app.selection.length > 1)
        {
            progress_bar.value = 20; // ---- Aumentar progreso
                        
            // Se almacenan los elementos seleccionados.
            var selected    = new Array;
            selected        = app.selection;
            selected_length = selected.length;

            // Se desagrupan todos los grupos existentes (este proceso "elimina" la selección actual).
            unGroup ();

            progress_bar.value = 35; // ---- Aumentar progreso

            // Se obtienen los límites visibles del grupo y se añaden los elementos a la selección actual (al desagrupar todo se perdío)
            var y1, x1, y2, x2;

            for (var i=0,iMax=selected_length; i<iMax; i++)
            {
                var visibleBounds = selected[i].visibleBounds;
                selected[i].select (SelectionOptions.ADD_TO);

                if ((y1 === undefined) || (y1 > visibleBounds[0])) y1 = visibleBounds[0];
                if ((x1 === undefined) || (x1 > visibleBounds[1])) x1 = visibleBounds[1];
                if ((y2 === undefined) || (y2 < visibleBounds[2])) y2 = visibleBounds[2];
                if ((x2 === undefined) || (x2 < visibleBounds[3])) x2 = visibleBounds[3];
            }

            // Se crea un rectangulo que incluye todos los elementos a exportar (sino algunas veces parte de la imágen se pierde).
            var group_bounds   = [y1 - 0.1, x1 - 0.1, y2 + 0.1, x2 + 0.1];        
            var groupRectangle = app.activeWindow.activePage.rectangles.add ({ geometricBounds:group_bounds, strokeColor:"None", fillColor:"None" });
            groupRectangle.select (SelectionOptions.ADD_TO);

            progress_bar.value = 50; // ---- Aumentar progreso            

            // Se obtiene los elementos seleccionados (ahora se incluye el rectagunlo previamente generado)
            selected        = new Array;
            selected        = app.selection;
            selected_length = selected.length;
            
            // Se exporta a PNG el conjunto seleccionado.            
            var grp = app.activeWindow.activePage.groups.add (selected);
            
            /*
            var links_to_check   = new Array ();
            var group_page_items = grp.allPageItems;
            for (var i=0, iMax=group_page_items.length; i<iMax; i++)         
            {
                if (group_page_items[i].isValid)
                {
                    var graphics = group_page_items[i].allGraphics;
                    for (var j=0, jMax=graphics.length; j<jMax; j++)
                    {
                        if (graphics[j].isValid && graphics[j].itemLink && graphics[j].itemLink.isValid) links_to_check.push (graphics[j].itemLink);
                    }
                }
            }
            
            //doLinks (links_to_check);
            //linksAlert ();*/
            
            progress_bar.value = 70; // ---- Aumentar progreso
            
            var file_name = "";
            
            if (image_type == "jpg")
            {
                var image_file = generateImageFile ("jpg");
                file_name      = decodeURI (image_file.name)
                exportJPG (grp, image_file, image_export_dpi, image_export_quality);
            }
            else
            {
                var image_file = generateImageFile ("png");
                file_name      = decodeURI (image_file.name)
                exportPNG (grp, image_file, image_export_dpi, image_export_quality);
            }

            grp.ungroup    ();
            groupRectangle.remove ();
            
            // Se obtiene el texto HTML para incluir la imágen.
            generateImageHTMLClipboard (file_name);
            
            progress_bar.value = 100; // ---- Aumentar progreso
            
            showPopup (texts["info"], texts["exporting_image_done"]);
        }
        else 
        {  
            progress_bar.value = 100; // ---- Aumentar progreso
            showPopup (texts["warning"], texts["select_one_or_more"]);
        }
    }
    catch (err)
    {
        progress_bar.value = 100; // ---- Aumentar progreso
        showPopup (texts["warning"], texts["exporting_image_fail_1"] + " " + err.message + "\n" + texts["exporting_image_fail_2"] + " " + err.line);
    }
}




function generateImageFile (extension)
{  
    var name = app.activeDocument.name;
    name     = name.substring (0, name.lastIndexOf ('.'));
    var file = new File (export_folder + images_folder + name + "_" + getSafeTimeHash () + "." + extension);
    
    return file;
}



function exportPNG (item, file, resolution, quality)
{
    switch (quality)
    {
        case 0:  quality = PNGQualityEnum.LOW;     break;
        case 1:  quality = PNGQualityEnum.MEDIUM;  break;
        case 2:  quality = PNGQualityEnum.HIGH;    break;
        case 3:  quality = PNGQualityEnum.MAXIMUM; break;
        default: quality = PNGQualityEnum.HIGH;    break;
    }
    
    with (app.pngExportPreferences)
    {
        antiAlias             = true;  
        exportResolution      = resolution;  
        embedColorProfile     = true;          
        exportingSpread       = false;  
        PNGColorSpace         = PNGColorSpaceEnum.RGB;  
        PNGExportRange        = PNGExportRangeEnum.EXPORT_ALL;  
        PNGQuality            = quality;  
        simulateOverprint     = false;  
        transparentBackground = true;  
        useDocumentBleeds     = true;  
    }
    
    item.exportFile (ExportFormat.PNG_FORMAT, file);
}



function exportJPG (item, file, resolution, quality)
{
    switch (quality)
    {
        case 0:  quality = JPEGOptionsQuality.LOW;     break;
        case 1:  quality = JPEGOptionsQuality.MEDIUM;  break;
        case 2:  quality = JPEGOptionsQuality.HIGH;    break;
        case 3:  quality = JPEGOptionsQuality.MAXIMUM; break;
        default: quality = JPEGOptionsQuality.HIGH;    break;
    }
    
    with (app.jpegExportPreferences)
    {
        antiAlias          = true;  
        embedColorProfile  = true;
        exportResolution   = resolution;  
        exportingSpread    = false;  
        jpegColorSpace     = JpegColorSpaceEnum.RGB;  
        jpegExportRange    = ExportRangeOrAllPages.EXPORT_ALL;  
        jpegQuality        = quality;  
        jpegRenderingStyle = JPEGOptionsFormat.PROGRESSIVE_ENCODING;
        simulateOverprint  = false;  
        useDocumentBleeds  = true;          
    }
    
    item.exportFile (ExportFormat.JPG, file);
}


function unGroup ()
{  
    var current_groups = app.activeDocument.groups;     
    while (current_groups.length != 0) current_groups.everyItem ().ungroup ();
}



function generateImageHTMLClipboard (fileName)
{
    var html_window          = new Window ("dialog", "HTML options", undefined, { closeButton: false });
    var html_group           = html_window.add ("group");
    html_group.orientation   = "column";
    html_group.alignChildren = "left";

    var type_group               = html_group.add ("panel", undefined, "Type");
    type_group.orientation       = "row";
    type_group.alignment         = "left";    
    var type_figure              = type_group.add ("radiobutton", undefined, "figure");
    var type_multimedia          = type_group.add ("radiobutton", undefined, "multimedia");
    type_group.children[0].value = true;

    var title_group         = html_group.add ("panel", undefined, "Title");
    title_group.orientation = "row";
    title_group.alignment   = "left";    
    var title_input         = title_group.add ("edittext", undefined, "Title");
    title_input.characters  = 100;

    var thumb_group         = html_group.add ("panel", undefined, "Thumbnail (Path from root)");
    thumb_group.orientation = "row";
    thumb_group.alignment   = "left";    
    var thumb_input         = thumb_group.add ("edittext", undefined, "");
    thumb_input.characters  = 100;

    var href_group         = html_group.add ("panel", undefined, "Link reference. Path from file in attribute 'href' of tag 'a')");
    href_group.orientation = "row";
    href_group.alignment   = "left";    
    var href_input         = href_group.add ("edittext", undefined, "");
    href_input.characters  = 100;

    var visibility_group               = html_group.add ("panel", undefined, "Visibility");
    visibility_group.orientation       = "row";
    visibility_group.alignment         = "left";    
    var vivibility_all                 = visibility_group.add ("radiobutton", undefined, "TOC, page and module");
    var visibility_toc                 = visibility_group.add ("radiobutton", undefined, "TOC and module");
    var visibility_page                = visibility_group.add ("radiobutton", undefined, "Page and module");
    var visibility_module              = visibility_group.add ("radiobutton", undefined, "Only module");
    visibility_group.children[0].value = true;    

    var accept = html_window.add ("button", undefined, "Accept", {name: "ok"});
    //var cancel = html_window.add ("button", undefined, "Cancel", {name: "cancel"});

    html_result = html_window.show ();

    var html_code = "";
    
    if (html_result == 1)
    {
        if (type_group.children[0].value === true)
        {
            var title       = title_input.text != "" ? (' data-title="' + title_input.text + '"' ) : '';
            var thumb       = thumb_input.text != "" ? (' data-thumb="' + thumb_input.text + '"' ) : '';            
            var b_toc       = visibility_group.children[1].value;
            var b_page      = visibility_group.children[2].value;
            var b_module    = visibility_group.children[3].value;            
            var toc_hidden  = (b_page || b_module) ? ' data-hidden'           : '';               
            var page_hidden = (b_toc  || b_module) ? ' style="display:none;"' : '';
            var href        = href_input.text  != "" ? (' href="' + href_input.text + '"' ) : ' href=""';
            
            html_code = '<figure' + title + thumb + toc_hidden + page_hidden + '>\n' +
                        '    <a href="' + href + '">\n' +
                        '        <img src="' + images_folder + fileName + '" alt="' + title_input.text + '">\n' +
                        '    </a>\n' +
                        '</figure>';
        }
        else
        {
            html_code = '<multimedia>\n' +
                        '    <img src="' + images_folder + fileName + '" alt="' + title_input.text + '">\n' +
                        '</multimedia>';
        }

        var textString = { contents: html_code };
        var textFrame  = app.activeDocument.textFrames.add (textString); 
        app.select (textFrame.parentStory.texts[0]); 
        app.copy (); 
        //textFrame.select (); creo que no hace falta
        textFrame.remove ();
    }
}



///////////////////////////////////////////////////
function exportImageByPageItemID (id)
{
    var pageItem      = app.activeDocument.pageItems.itemByID (id);       
    var link_img_name = id.toString ();
    var type          = "png";
    var html_code     = "";
    var fileName      = ""; 
    
    if (pageItem instanceof Image)
    {
        type          = pageItem.imageTypeName;
        link_img_name = pageItem.itemLink.name;
        link_img_name = link_img_name.substr (0, link_img_name.lastIndexOf ('.'));             
    }
    else
    {
        if
        (
            (pageItem.allGraphics != null)                      && (pageItem.allGraphics.length > 0)        &&
            pageItem.allGraphics[0].hasOwnProperty ('itemLink') && pageItem.allGraphics[0].itemLink != null && pageItem.allGraphics[0].itemLink.isValid
        )
        {
            type          = pageItem.allGraphics[0].imageTypeName;
            link_img_name = pageItem.allGraphics[0].itemLink.name;
            link_img_name = link_img_name.substr (0, link_img_name.lastIndexOf ('.'));
        }
        else if (pageItem.hasOwnProperty ('itemLink') && (pageItem.itemLink != null) && pageItem.itemLink.isValid)
        {
            type          = pageItem.imageTypeName;
            link_img_name = pageItem.itemLink.name;
            link_img_name = link_img_name.substr (0, link_img_name.lastIndexOf ('.'));            
        }
        else
        {
            // Casos especiales.
            // Comprobados que funcionan: Polygon.
        }
    }    

    switch (type.toLowerCase ())
    {
        case "jpg": case "jpeg":
        {
            var imageFile = new File (export_folder + images_folder + link_img_name + ".jpg");
            fileName      = decodeURI (imageFile.name);
            exportJPG (pageItem, imageFile, image_export_dpi, image_export_quality);
            
            break;
        }
        
        default: 
        {
            var imageFile = new File (export_folder + images_folder + link_img_name + ".png");
            fileName      = decodeURI (imageFile.name);
            exportPNG (pageItem, imageFile, image_export_dpi, image_export_quality);
            
            break;
        }
    }

    var size = getDims (pageItem, true);
    
    // From poits to pixels
    //var w = (size[0] / 11.955168).toFixed (2);
    //var h = (size[1] / 11.955168).toFixed (2);
    var w = (size[0] / 10).toFixed (2);
    var h = (size[1] / 10).toFixed (2);    
    
    
    //var page_w = app.activeDocument.pages[0].bounds[3];
    //var page_h   = app.activeDocument.pages[0].bounds[2];    
    
    html_code = '<img src="' + images_folder + fileName + '" alt="image" class="anchored_image" style="width:' + w + 'em; height:' + h + 'em;" />';
    
    return html_code;    
}


// Return *IN POINTS* the actual [width,height] of the page item
function getDims (obj, b_visibleBounds)
{
    var boxLimits = BoundingBoxLimits [(b_visibleBounds) ? 'OUTER_STROKE_BOUNDS': 'GEOMETRIC_PATH_BOUNDS'];
     
    var getCoords = function (cornerPt) { return this.resolve ([cornerPt, boxLimits], CoordinateSpaces.innerCoordinates)[0]; }
     
    // get [left,top, right,bottom] inner coordinates
    var coords = getCoords.call (obj,AnchorPoint.topLeftAnchor).concat (getCoords.call (obj,AnchorPoint.bottomRightAnchor));
     
    // calculate the width and the height
    var sa = obj.shearAngle;
    var w  = coords[2] - coords[0];
    var h  = (coords[3] - coords[1]) / Math.cos (sa * Math.PI / 180);

    return [w, h];
}




function relinkProcess ()
{
    doLinks ();
    //linksAlert ();
    
    // Avisa de que se compruebe y se guarde si todo fue bien.
    var relink_dialog        = new Window      ("dialog", "Warning", undefined, { closeButton: false });
    var relink_panel         = relink_dialog.add ("panel", undefined, texts["relink_save_title"]);
    relink_panel.orientation = "column";
    relink_panel.alignment   = "left";
    var relink_texts         = texts["relink_save_texts"].split ("\n");        
    for (var l=0, maxL=relink_texts.length; l<maxL; l++) relink_panel.add ('statictext', undefined, relink_texts[l]);        
    relink_dialog.add ("button", undefined, "Accept", {name: "ok" });
    relink_dialog.show ();
}


/**
 * doLinks
 * Solicita una carpeta y restablece los vínculos con los ficheros que contentienen.
 */ 
function doLinks (links)
{    
    // Solicita carpeta al usuario:
    var links_folder = Folder (app.activeDocument.filePath).selectDlg ("Choose a folder with the new links:");    
    
    // Si se canceló o no existe, finaliza.
    if (links_folder == null) return -1;
    
    // Se procesan los 'links' y la/s carpeta/s seleccionada/s.
    if (links === undefined) links = app.activeDocument.links;

    // Si no hay links o están vacios.
    if ((links == null) || (links.length == 0)) return -2;    
    
    var progress_window              = new Window ('palette', "Relinking...");
    var progress_lenght              = links.length;
    var progress_bar                 = progress_window.add ('progressbar', undefined, 0, progress_lenght);
    progress_bar.preferredSize.width = 300;
    progress_window.show ();
    
    for (var i=links.length-1; i>=0; i--)
    {
        var oldLink = links[i];
        
        if (linkIsImage (oldLink))
        {
            if ((oldLink.status == LinkStatus.NORMAL) || (oldLink.status == LinkStatus.LINK_EMBEDDED)) continue;            
            
            var newFile = new File (links_folder.fsName + "/" + oldLink.name);

            if (newFile.exists) relink (oldLink, newFile);
            else
            {
                // Si no existe un fichero con el mismo nombre en la carpeta seleccionada, se busca otro lo más parecido posible (la subcadena común más larga)
                // Si hay varios posibles se escoge el de mayor peso (suele haber dos versiones una en alta y otra en baja con los textos HIGH y PRV para diferenciarlas)
                // Esto ahora funciona, pero puede llegar a fallar, habrá que revisar esta estrategia para mejorarla.
                var files        = links_folder.getFiles ();
                var most_similar = new Array ();

                for (var f=0, fMax=files.length; f<fMax; f++)
                {
                    var try_name = files[f].displayName;
                    var common   = longestCommonSubstring (oldLink.name, try_name.substr (0, try_name.lastIndexOf ('.')));
                    
                    if (most_similar.length > 0)
                    {
                        if      (most_similar[0].length == common.length) most_similar.push ({ length:common.length, index:f });
                        else if (most_similar[0].length <  common.length)
                        {
                            most_similar = new Array ();
                            most_similar.push ({ length:common.length, index:f });
                        }
                    }
                    else most_similar.push ({ length:common.length, index:f });
                }
                
                var most_similar_len = most_similar.length;
                
                if (most_similar_len > 0)
                {       
                    var file_size    =  0;
                    var larger_index = -1;
                    
                    for (var s=0; s<most_similar_len; s++)
                    {
                        if (file_size < files[most_similar[s].index].length)
                        {
                            file_size    = files[most_similar[s].index].length;
                            larger_index = s;
                        }
                    }
                    
                    if (larger_index != -1) relink (oldLink, files[most_similar[larger_index].index]);
                }
            }
        }
        
        progress_bar.value++;
    }
    
    progress_window.close ();

    //alert ("Finished.");
}


/**
 * linkIsImage
 * Comprueba si el link es a una imágen
 */
function linkIsImage (link)
{
    switch (link.linkType.toLowerCase ())
    {
        case "jpeg": case "png": case "eps": case "tiff": case "gif": case "bmp": case "photoshop": return true;
        
        default: return false;
    }
}


/**
 * relink
 * Restablece el vínculo con una ruta nueva e intenta actualizar.
 */
function relink (oldLink, newFile)
{
    oldLink.relink (newFile);    

    try         { oldLink = oldLink.update (); }
    catch (err) { $.writeln (err.message + ", line: " + err.line); }   
}


/**
 * longestCommonSubstring
 * Devuelve un objeto con la subcadena más larga que tengan en común otras dos.
 */
function longestCommonSubstring (str1, str2)
{
    if (!str1 || !str2) return { length:0, sequence:"" };
 
    var sequence  = "",
    str1Length    = str1.length,
    str2Length    = str2.length,
    num           = new Array (str1Length),
    maxlen        = 0,
    lastSubsBegin = 0;
 
    for (var i = 0; i < str1Length; i++)
    {
        var subArray = new Array (str2Length);
        for (var j=0; j<str2Length; j++) subArray[j] = 0;
        num[i] = subArray;
    }
    
    var thisSubsBegin = null;
    for (var i=0; i<str1Length; i++)
    {
        for (var j = 0; j < str2Length; j++)
        {
            if (str1[i] !== str2[j]) num[i][j] = 0;
            else
            {
                if ((i === 0) || (j === 0)) num[i][j] = 1;
                else                        num[i][j] = 1 + num[i - 1][j - 1];
 
                if (num[i][j] > maxlen)
                {
                    maxlen        = num[i][j];
                    thisSubsBegin = i - num[i][j] + 1;
                    
                    if (lastSubsBegin === thisSubsBegin)
                    {
                        sequence += str1[i];
                    }
                    else
                    {
                        lastSubsBegin = thisSubsBegin;
                        sequence      = str1.substr (lastSubsBegin, (i + 1) - lastSubsBegin);
                    }
                }
            }
        }
    }
    
    return { length:maxlen, sequence:sequence };
}

