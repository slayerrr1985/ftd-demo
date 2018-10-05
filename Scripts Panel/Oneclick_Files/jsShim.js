if (!String.prototype.trim)
{
    String.prototype.trim = function () { return this.replace(/^\s+|\s+$/gm,''); }
}


if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function (item)
    { 
        for (var i = 0, l = this.length; i < l; i++)
        {
            if (this[i] === item && i in this) return i;
        }
        
        return -1;
    }
}


Array.prototype.mergeSort = function(testFunction)
{ 
    return sort (this, testFunction);
    
    function sort(array, compare)
    {
        if (array.length <= 1) return array;

        var i;
        var middle = Math.floor(array.length / 2);
        var left   = new Array(middle);
        var right  = new Array(array.length - middle);

        for (i = 0; i < left.length;  i++) left [i] = array[i];        
        for (i = 0; i < right.length; i++) right[i] = array[i + left.length];
        
        return merge(sort(left, compare), sort(right, compare), compare);
    }

    function merge(left, right, compare)
    {
        var result = new Array(left.length + right.length);
        var leftIndex = 0;
        var rightIndex = 0;
        var resultIndex = 0;

        while (leftIndex < left.length || rightIndex < right.length)
        {
            if (leftIndex < left.length && rightIndex < right.length)
            {
                if (compare(left[leftIndex], right[rightIndex]) <= 0) result[resultIndex++] = left[leftIndex++];
                else                                                  result[resultIndex++] = right[rightIndex++];
            }
            else if (leftIndex  < left.length)  result[resultIndex++] = left[leftIndex++];
            else if (rightIndex < right.length) result[resultIndex++] = right[rightIndex++];
        }
        return result;
    }
}