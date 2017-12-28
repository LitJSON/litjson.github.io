Title: Configuring the library’s behavior
Order: 30
---

JSON is a very concise data-interchange format; nothing more, nothing less. For this reason, handling data in JSON format inside a program may require a deliberate decision on your part regarding some little detail that goes beyond the scope of JSON’s specs.

Consider, for example, reading data from JSON strings where single-quotes are used to delimit strings, or Javascript-style comments are included as a form of documentation. Those things are not part of the JSON standard, but they are commonly used by some developers, so you may want to be forgiving or strict depending on the situation. Or what about if you want to convert a .Net object into a JSON string, but pretty-printed (using indentation)?

To declare the behavior you want, you may change a few properties from your `JsonReader` and `JsonWriter` objects.

## Configuration of JsonReader

```csharp
using LitJson;
using System;

public class JsonReaderConfigExample
{
    public static void Main()
    {
        string json;

        json = " /* these are some numbers */ [ 2, 3, 5, 7, 11 ] ";
        TestReadingArray(json);

        json = " [ \"hello\", 'world' ] ";
        TestReadingArray(json);
    }

    static void TestReadingArray(string json_array)
    {
        JsonReader defaultReader, customReader;

        defaultReader = new JsonReader(json_array);
        customReader  = new JsonReader(json_array);

        customReader.AllowComments            = false;
        customReader.AllowSingleQuotedStrings = false;

        ReadArray(defaultReader);
        ReadArray(customReader);
    }

    static void ReadArray(JsonReader reader)
    {
        Console.WriteLine("Reading an array");

        try {
            JsonData data = JsonMapper.ToObject(reader);

            foreach (JsonData elem in data)
                Console.Write("  {0}", elem);

            Console.WriteLine("  [end]");
        }
        catch (Exception e) {
            Console.WriteLine("  Exception caught: {0}", e.Message);
        }
    }
}
```

### Output from the example:

```
Reading an array
  2  3  5  7  11  [end]
Reading an array
  Exception caught: Invalid character '/' in input string
Reading an array
  hello  world  [end]
Reading an array
  Exception caught: Invalid character ''' in input string
```

## Configuration of JsonWriter

```csharp
using LitJson;
using System;

public enum AnimalType
{
    Dog,
    Cat,
    Parrot
}

public class Animal
{
    public string     Name { get; set; }
    public AnimalType Type { get; set; }
    public int        Age  { get; set; }
    public string[]   Toys { get; set; }
}

public class JsonWriterConfigExample
{
    public static void Main()
    {
        var dog = new Animal {
            Name = "Noam Chompsky",
            Type = AnimalType.Dog,
            Age  = 3,
            Toys = new string[] { "rubber bone", "tennis ball" }
        };

        var cat = new Animal {
            Name = "Colonel Meow",
            Type = AnimalType.Cat,
            Age  = 5,
            Toys = new string[] { "cardboard box" }
        };

        TestWritingAnimal(dog);
        TestWritingAnimal(cat, 2);
    }

    static void TestWritingAnimal(Animal pet, int indentLevel = 0)
    {
        Console.WriteLine("\nConverting {0}'s data into JSON..", pet.Name);
        JsonWriter writer1 = new JsonWriter(Console.Out);
        JsonWriter writer2 = new JsonWriter(Console.Out);

        writer2.PrettyPrint = true;
        if (indentLevel != 0)
            writer2.IndentValue = indentLevel;

        Console.WriteLine("Default JSON string:");
        JsonMapper.ToJson(pet, writer1);

        Console.Write("\nPretty-printed:");
        JsonMapper.ToJson(pet, writer2);
        Console.WriteLine("");
    }
}
```

### Output from the example:

```json
Converting Noam Chompsky's data into JSON..
Default JSON string:
{"Name":"Noam Chompsky","Type":0,"Age":3,"Toys":["rubber bone","tennis ball"]}
Pretty-printed:
{
    "Name" : "Noam Chompsky",
    "Type" : 0,
    "Age"  : 3,
    "Toys" : [
        "rubber bone",
        "tennis ball"
    ]
}

Converting Colonel Meow's data into JSON..
Default JSON string:
{"Name":"Colonel Meow","Type":1,"Age":5,"Toys":["cardboard box"]}
Pretty-printed:
{
  "Name" : "Colonel Meow",
  "Type" : 1,
  "Age"  : 5,
  "Toys" : [
    "cardboard box"
  ]
}
```