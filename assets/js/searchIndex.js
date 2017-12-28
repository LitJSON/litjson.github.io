
var camelCaseTokenizer = function (obj) {
    var previous = '';
    return obj.toString().trim().split(/[\s\-]+|(?=[A-Z])/).reduce(function(acc, cur) {
        var current = cur.toLowerCase();
        if(acc.length === 0) {
            previous = current;
            return acc.concat(current);
        }
        previous = previous.concat(current);
        return acc.concat([current, previous]);
    }, []);
}
lunr.tokenizer.registerFunction(camelCaseTokenizer, 'camelCaseTokenizer')
var searchModule = function() {
    var idMap = [];
    function y(e) { 
        idMap.push(e); 
    }
    var idx = lunr(function() {
        this.field('title', { boost: 10 });
        this.field('content');
        this.field('description', { boost: 5 });
        this.field('tags', { boost: 50 });
        this.ref('id');
        this.tokenizer(camelCaseTokenizer);

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
    });
    function a(e) { 
        idx.add(e); 
    }

    a({
        id:0,
        title:"JsonToken",
        content:"JsonToken",
        description:'',
        tags:''
    });

    a({
        id:1,
        title:"IJsonWrapper",
        content:"IJsonWrapper",
        description:'',
        tags:''
    });

    a({
        id:2,
        title:"JsonMapper",
        content:"JsonMapper",
        description:'',
        tags:''
    });

    a({
        id:3,
        title:"JsonData",
        content:"JsonData",
        description:'',
        tags:''
    });

    a({
        id:4,
        title:"JsonType",
        content:"JsonType",
        description:'',
        tags:''
    });

    a({
        id:5,
        title:"ExporterFunc",
        content:"ExporterFunc",
        description:'',
        tags:''
    });

    a({
        id:6,
        title:"JsonWriter",
        content:"JsonWriter",
        description:'',
        tags:''
    });

    a({
        id:7,
        title:"JsonMockWrapper",
        content:"JsonMockWrapper",
        description:'',
        tags:''
    });

    a({
        id:8,
        title:"JsonException",
        content:"JsonException",
        description:'',
        tags:''
    });

    a({
        id:9,
        title:"WrapperFactory",
        content:"WrapperFactory",
        description:'',
        tags:''
    });

    a({
        id:10,
        title:"JsonReader",
        content:"JsonReader",
        description:'',
        tags:''
    });

    a({
        id:11,
        title:"ImporterFunc",
        content:"ImporterFunc",
        description:'',
        tags:''
    });

    y({
        url:'/api/LitJson/JsonToken',
        title:"JsonToken",
        description:""
    });

    y({
        url:'/api/LitJson/IJsonWrapper',
        title:"IJsonWrapper",
        description:""
    });

    y({
        url:'/api/LitJson/JsonMapper',
        title:"JsonMapper",
        description:""
    });

    y({
        url:'/api/LitJson/JsonData',
        title:"JsonData",
        description:""
    });

    y({
        url:'/api/LitJson/JsonType',
        title:"JsonType",
        description:""
    });

    y({
        url:'/api/LitJson/ExporterFunc_1',
        title:"ExporterFunc<T>",
        description:""
    });

    y({
        url:'/api/LitJson/JsonWriter',
        title:"JsonWriter",
        description:""
    });

    y({
        url:'/api/LitJson/JsonMockWrapper',
        title:"JsonMockWrapper",
        description:""
    });

    y({
        url:'/api/LitJson/JsonException',
        title:"JsonException",
        description:""
    });

    y({
        url:'/api/LitJson/WrapperFactory',
        title:"WrapperFactory",
        description:""
    });

    y({
        url:'/api/LitJson/JsonReader',
        title:"JsonReader",
        description:""
    });

    y({
        url:'/api/LitJson/ImporterFunc_2',
        title:"ImporterFunc<TJson, TValue>",
        description:""
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
