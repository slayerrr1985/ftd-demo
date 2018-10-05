/**
 * @file Simulador de DOM HTML. Permite crear y manipular un arbol de Nodes, objetos JavaScript que simulan DOM nodes.
 * @author Téo Metz
 * @version 0.1.0
 */

  
/**
 * Configuracion del metodo toString para generar HTML.
 * domToStringConfig.indentationSpaces: numero de espacios con los que se indenta el fichero HTML entre un node y sus hijos.
 * domToStringConfig.inlineContents: para los tags HTML incluidos en esta tabla, no se pasara a la linea ni se indentara
 * antes de escribir sus hijos.
 * @type {{indentationSpaces: number, inlineContents: string[]}}
 */
var domToStringConfig =
{
    indentationSpaces: 4,
    inlineContents: ['span', 'h1', 'h2', 'h3', 'h4']
}


/**
 * permite inicializar un DOM con un Node que puede servir de raiz.
 * @returns {Node}
 */
function dommy()
{ 
    return new Node('selfDom', 'DOM');
}


/**
 * Constructor de Nodes. Sin una razon especial para utilizar este constructor, es preferible inicializar el DOM
 * con dommy().
 * @param {Node} parent - El Node padre de este Node
 * @param {string} tag - Un tag HTML ('h1', 'p'...)
 * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
 * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
 * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
 * @constructor
 */
function Node(parent, tag, className, properties, contents)
{     
    this.parent = parent;
    this.tag = tag;
    this.className = className || undefined;
    this.properties = properties || {};
    this.contents = contents || [];

    /**
     * Crea un node cuyo parent es this, pero sin agregarlo al array de hijos de this.
     * @param {string} tag - Un tag HTML ('h1', 'p'...)
     * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
     * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
     * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
     * @returns {Node} - El Node recien creado
     */
    this.node = function(tag, className, properties, contents)
    {
        return new Node(this, tag, className, properties, contents);
    }


    //Ejemplo de declarativeObject que se puede utilizar con declarativeAppend:
    //{
    //    mNode0: 'div',
    //    mClass0: 'big',
    //    mProperties0: 'id<ret<<name<fuka',
    //    mNode0_0: 'p',
    //    mNode0_1: 'div',
    //    mNode0_1_0: 'p',
    //    mNode1: 'section'
    //}
    this.declarativeAppend = function(declarativeObject)
    {
        var propertyNames = [];
        for (var property in declarativeObject)
        { 
            //TODO if declarativeObject[property] is falsy delete it
            if (typeof declarativeObject[property] !== 'string')
            {
                throw 'Error: Invalid declarative object in declarativeAppend call, declarative object properties should be strings';
            }
            propertyNames.push(property);
        }
        
        var toProcess = this;
        var initialContentsLength = this.contents.length;
        var i = 0;
        var propertyNamesControlLength = propertyNames.length;
        var supplementaryControlLength = propertyNames.length;
        
        while (i in propertyNames)
        { 
            toProcess = this;
            var descriptor = propertyNames[i].split('_');
            descriptor.splice(1, 0, descriptor[0].charAt(descriptor[0].length - 1));
            descriptor[0] = descriptor[0].substr(0,descriptor[0].length - 1);
            var descriptorLength = descriptor.length;

            for (var j = 1; j < descriptorLength; j++) descriptor[j] = Number(descriptor[j]);
            
            function findNodeToProcessThenDo(process, contentToSetShouldAlreadyExist)
            {
                j = 1;
                if (j === descriptorLength - 1)
                { 
                    if (toProcess.contents.length >= initialContentsLength + descriptor[j] + contentToSetShouldAlreadyExist) process(toProcess, initialContentsLength + descriptor[j]);
                    else                                                                                                     propertyNames.push(propertyNames[i]);
                }
                else
                { 
                    if (initialContentsLength + descriptor[j] in toProcess.contents)
                    { 
                        toProcess = toProcess.contents[initialContentsLength + descriptor[j]];
                        j++;
                        
                        while (j < descriptorLength - 1 && descriptor[j] in toProcess.contents)
                        {
                            toProcess = toProcess.contents[descriptor[j]];
                            j++;
                        }
                        
                        if (j === descriptorLength - 1)
                        {
                            if (toProcess.contents.length >= descriptor[j] + contentToSetShouldAlreadyExist) process(toProcess, descriptor[j]);
                            else                                                                             propertyNames.push(propertyNames[i]);
                        }
                        else propertyNames.push(propertyNames[i]);
                    }
                    else propertyNames.push(propertyNames[i]);
                }
            }
            
            if (descriptor[0] === 'mNode')
            { 
                function mNode(toProcess) { toProcess.nodeAppend(declarativeObject[propertyNames[i]]); }
                findNodeToProcessThenDo(mNode, false);
            }
            
            if (descriptor[0] === 'mString')
            { 
                function mString(toProcess) { toProcess.contents.push(declarativeObject[propertyNames[i]]); }
                findNodeToProcessThenDo(mString, false);
            }
            
            if (descriptor[0] === 'mClass')
            {
                function mClass(toProcess, contentIndex) { toProcess.get(contentIndex).className = declarativeObject[propertyNames[i]]; }
                findNodeToProcessThenDo(mClass, true);
            }
            
            if (descriptor[0] === 'mProperties')
            {
                function mProperties(toProcess, contentIndex)
                {
                    var propertiesDeclaration = declarativeObject[propertyNames[i]].split('<<');
                    var propertiesObject = {};
                    
                    for (var k = 0, pdl = propertiesDeclaration.length; k < pdl; k++)
                    {
                        var property = propertiesDeclaration[k].split('<');
                        if (property.length !== 2) { throw 'Error: Invalid mProperties in declarative object in declarativeAppend call'; }
                        propertiesObject[property[0]] = property[1];
                    }
                    toProcess.get(contentIndex).properties = propertiesObject;
                }
                findNodeToProcessThenDo(mProperties, true);
            }
            
            if (i === propertyNamesControlLength)
            { 
                if (propertyNames.length === propertyNamesControlLength + supplementaryControlLength)
                { 
                    throw 'Error: Invalid declarative object in declarativeAppend call, could not process one or more declarative object properties';
                }
                else
                { 
                    supplementaryControlLength = propertyNames.length - propertyNamesControlLength;
                    propertyNamesControlLength = propertyNames.length;
                }
            }
            i++;
        }
    }

    
    /**
     * El indice de this entre los contenidos de su parent.
     * @returns {Number}
     */
    this.index = function() { return this.parent.contents.indexOf(this); }

    
    /**
     * Agrega this al final de los contenidos de this.parent
     * @returns {Node} - this
     */
    this.append = function()
    {
        this.parent.contents.push(this);
        return this;
    }

    
    /**
     * Agrega this al principio de los contenidos de this.parent.
     * @returns {Node} - this
     */
    this.prepend = function()
    {
        this.parent.contents.unshift(this);
        return this;
    }

    
    /**
     * Aplica this.node().append().
     * @param {string} tag - Un tag HTML ('h1', 'p'...)
     * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
     * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
     * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
     * @returns {Node} - el Node recien creado
     */
    this.nodeAppend = function(tag, className, properties, contents)
    {
        return this.node(tag, className, properties, contents).append();
    }

    
    /**
     * Aplica this.node().prepend().
     * @param {string} tag - Un tag HTML ('h1', 'p'...)
     * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
     * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
     * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
     * @returns {Node} - el Node recien creado
     */
    this.nodePrepend = function(tag, className, properties, contents)
    {
        return this.node(tag, className, properties, contents).prepend();
    }

    
    /**
     * Inserta this entre los contenidos de this.parent al indice index.
     * @param {int} index
     * @returns {Node} - this
     */
    this.insert = function(index)
    {
        this.parent.contents.splice(index, 0, this);
        return this;
    }

    
    /**
     * Devuelve, si existe, el contenido precedente a this de entre los contenidos de this.parent. Si no existe,
     * devuelve undefined.
     * @returns {Node|string|undefined}
     */
    this.previous = function()
    {
        var i = this.index();
        if (i != -1 && i > 0) {
            return this.parent.contents[i - 1];
        }
        return undefined;
    }

    
    /**
     * Devuelve, si existe, el contenido siguiente a this de entre los contenidos de this.parent. Si no existe,
     * devuelve undefined.
     * @returns {Node|string|undefined}
     */
    this.next = function()
    { 
        var i = this.index();
        if (i != -1 && i < this.parent.contents.length - 1) {
            return this.parent.contents[i + 1];
        }
        return undefined;
    }

    
    /**
     * Devuelve el primer elemento de los contenidos de this. Si this no tiene contenidos devuelve undefined.
     * @returns {Node|string|undefined}
     */
    this.first = function() { return this.contents[0]; }

    
    /**
     * Devuelve el ultimo elemento de los contenidos de this. Si this no tiene contenidos devuelve undefined.
     * @returns {Node|string|undefined}
     */
    this.last = function() { return this.contents[this.contents.length - 1]; }

    
    /**
     * Devuelve el elemento de indice i de los contenidos de this. Si no existe devuelve undefined.
     * @param {int} i
     * @returns {Node|string|undefined}
     */
    this.get = function(i) { return this.contents[i]; }

    
    /**
     * Devuelve el ultimo elemento de los contenidos de this filtrado por tag. Si no existe devuelve undefined.
     * @param {string} tag
     * @returns {Node|string|undefined}
     */
    this.getLastByTag = function(tag)
    {
        var last = undefined;
        var i = this.contents.length - 1;
        
        while (i >= 0 && last === undefined)
        {
            if (this.get(i) instanceof Node && this.get(i).tag === tag) last = this.get(i);
            
            i--;
        }
        
        return last;
    }

    
    /**
     * Devuelve true si className es un substring de this.className, false si no.
     * @param {string} className
     * @returns {boolean}
     */
    this.hasClass = function(className)
    {
        if (typeof this.className === 'string')  return (this.className.indexOf(className) !== -1);        
        else                                     return false;
    }

    
    /**
     * Agrega className a this.className.
     * @param {string} className
     * @returns {Node} - this
     */
    this.addClass = function(className)
    { 
        if      (typeof this.className === 'string') this.className = this.className.concat(' ' + className).replace('  ', ' ').trim();
        else if (this.className === undefined)       this.className = className;

        return this;
    }

    
    /**
     * Quita className de this.className.
     * @param {string} className
     * @returns {Node} - this
     */
    this.removeClass = function(className)
    { 
        if (typeof this.className === 'string')  this.className = this.className.replace('' + className, '').replace('  ', ' ').trim();

        return this;
    }

    
    /**
     * Desplaza this de los contenidos de su actual parent hacia los de hostNode.
     * @param {Node} hostNode
     * @returns {Node} - this
     */
    this.moveTo = function(hostNode)
    {
        this.parent.contents.splice(this.index(), 1);
        this.parent = hostNode;
        return this;
    }

    
    /**
     * Desplaza todos los contenidos de this hacia los contenidos de hostNode.
     * @param {Node} hostNode
     * @param {boolean} doRemoveThis - Especifica si this debe ser destruido al final de la operacion
     * @param {int} insertIndex - el indice de los contenidos de hostNode al cual se insertaran los contenidos de this
     */
    this.moveContentsTo = function(hostNode, doRemoveThis, insertIndex)
    {
        for (var i = 0, cl = this.contents.length; i < cl; i++)
        {
            if (this.get(i) instanceof Node)
            { 
                this.get(i).parent = hostNode;
                if (insertIndex !== undefined) this.get(i).insert(insertIndex + i);
                else                           this.get(i).append();                
            }
            else if (typeof this.get(i) === 'string')
            {
                if (insertIndex !== undefined) hostNode.contents.splice(insertIndex + i, 0, this.get(i));
                else                           hostNode.contents.push(this.get(i));
            }
        }
        
        if (doRemoveThis) this.parent.contents.splice(this.index(), 1);
        else              this.contents = [];
    }

    
    /**
     * Destruye this, y saca los contenidos de this hacia this.parent, dejandolos en lugar de this. Si this no tiene
     * parent, no hace nada y devuelve undefined.
     * @returns {Node|undefined} - this.parent, si este no existe, undefined
     */
    this.implode = function()
    {
        if (this.parent instanceof Node)
        {
            this.moveContentsTo(this.parent, true, this.index());
            return this.parent;
        }
        
        return undefined;
    }

    
    /**
     * Interpone un nuevo Node entre this y sus contenidos.
     * @param {string} tag - Un tag HTML ('h1', 'p'...)
     * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
     * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
     * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
     * @returns {Node} - El nuevo node interpuesto
     */
    this.interposeNode = function(tag, className, properties, contents)
    {
        var interposedNode = this.node(tag, className, properties, contents);
        this.moveContentsTo(interposedNode);
        interposedNode.append();
    
        return interposedNode;
    }

    
    /**
     * Crea un nuevo parent Node para this. El nuevo Node reemplaza a this entre los contenidos de su antiguo parent.
     * @param {string} tag - Un tag HTML ('h1', 'p'...)
     * @param {string} className - Una o varias clases CSS ('footer', 'container red'...)
     * @param {object} properties - Un objeto de propriedades string ({id: 'one', style: 'color:red;'})
     * @param {Node[]|string} contents - Los Nodes hijos del Node, o contenidos string
     * @returns {Node} - El nuevo parent
     */
    this.newParent = function(tag, className, properties, contents)
    { 
        var newParent = this.parent.node(tag, className, properties, contents).insert(this.index());
        this.moveTo(newParent).append();
    
        return newParent;
    }

    /**
     * Concatena todos los nodes de tag tag que se sucedan entre los contenidos de this. Si no se especifica tag, se
     * concatenan todos los nodes de mismo tag.
     * @param {string} tag
     */
    this.concatenateSuccessive = function(tag)
    { 
        var previousNode = this.first();
        for (var i = 1; i < this.contents.length; i++)
        { 
            var test = tag ? (previousNode.tag === this.get(i).tag && previousNode.tag === tag) : (previousNode.tag === this.get(i).tag);
            if (previousNode instanceof Node && this.get(i) instanceof Node && test)
            { 
                this.get(i).moveContentsTo(previousNode, true);
                i--;
            }
            else previousNode = this.get(i);
        }
    }
    
    
    this.concatenateSuccessiveByClassName = function(className)
    { 
        var previousNode = this.first();
        for (var i = 1; i < this.contents.length; i++)
        { 
            var test = className ? (previousNode.className === this.get(i).className && previousNode.className === className) : (previousNode.className === this.get(i).className);
            
            if (previousNode instanceof Node && this.get(i) instanceof Node && test)
            { 
                this.get(i).moveContentsTo(previousNode, true);
                i--;
            }
            else previousNode = this.get(i);
        }
    }

    
    /**
     * Devuelve una string HTML que representa a this.
     * @returns {string}
     */
    this.toString = function()
    { 
        return stringLeDomWithIndentation(this, '');
        
        var isParentInlineContents;
        
        function stringLeDomWithIndentation(node, indentation)
        {
            var result = '';
            var wasInlineContents = isParentInlineContents;
            var isInlineContents;
            if (node instanceof Node)
            { 
                /*if (node.parent && node.parent.className === 'book-content-width book-content-bg-color-white')
                {
                    //$.writeln(node.tag + ' : ' + node.style + '   page: ' + node.currPageIndex + '   item: ' + node.currPageItemIndex + '   par: ' + node.currParagraphIndex + '   itemz: ' + node.currPageItemZIndex);
                }*/
                
                result += (isParentInlineContents ? '' : indentation) + '<' + (node.tag ? node.tag : '') + (node.className ? ' class="' + node.className + '"' : '');

                var properties = node.properties;
                for (var property in properties)
                { 
                    if (typeof properties[property] === 'string') result += ' ' + property + '="' + properties[property] + '"';
                }
                
                var i = 0;
                var icl = domToStringConfig.inlineContents.length;
                while (i < icl && !isInlineContents)
                {
                    if (node.tag === domToStringConfig.inlineContents[i]) isInlineContents = true;
                    
                    i++;
                }
                
                result += '>' + (isInlineContents ? '' : '\n');
                var contentsIndentation = indentation;
                for (var i = 0, isl = domToStringConfig.indentationSpaces; i < isl; i++) contentsIndentation += ' ';
                
                isParentInlineContents = isInlineContents;
                for (var i = 0, cl = node.contents.length; i < cl; i++) result += stringLeDomWithIndentation(node.contents[i], contentsIndentation);
                
                result += (isInlineContents ? '' : indentation) + '</' + (node.tag ? node.tag : '') + '>' + (wasInlineContents ? '' : '\n');
                isParentInlineContents = wasInlineContents;
            }
            else if (typeof node === 'string') result += (isParentInlineContents ? '' : indentation) + node + (isParentInlineContents ? '' : '\n');            
            
            return result;
        }
    }
}