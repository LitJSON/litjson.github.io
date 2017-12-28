Title: Mapping JSON to objects and vice versa
Order: 10
---

In order to consume data in JSON format inside .Net programs, the natural approach that comes to mind is to use JSON text to populate a new instance of a particular class; either a custom one, built to match the structure of the input JSON text, or a more general one which acts as a dictionary.

Conversely, in order to build new JSON strings from data stored in objects, a simple *export* operation sounds like a good idea.

For this purpose, *LitJSON* includes the JsonMapper class, which provides two main methods used to do JSON-to-object and object-to-JSON conversions. These methods are `JsonMapper.ToObject` and  `JsonMapper.ToJson`.

## Simple JsonMapper examples

```csharp
using LitJson;
using System;

public class Person
{
    // C# 3.0 auto-implemented properties
    public string   Name     { get; set; }
    public int      Age      { get; set; }
    public DateTime Birthday { get; set; }
}

public class JsonSample
{
    public static void Main()
    {
        PersonToJson();
        JsonToPerson();
    }

    public static void PersonToJson()
    {
        Person bill = new Person();

        bill.Name = "William Shakespeare";
        bill.Age  = 51;
        bill.Birthday = new DateTime(1564, 4, 26);

        string json_bill = JsonMapper.ToJson(bill);

        Console.WriteLine(json_bill);
    }

    public static void JsonToPerson()
    {
        string json = @"
            {
                ""Name""     : ""Thomas More"",
                ""Age""      : 57,
                ""Birthday"" : ""02/07/1478 00:00:00""
            }";

        Person thomas = JsonMapper.ToObject<Person>(json);

        Console.WriteLine("Thomas' age: {0}", thomas.Age);
    }
}
```

### Output from the example:

```json
{"Name":"William Shakespeare","Age":51,"Birthday":"04/26/1564 00:00:00"}
Thomas' age: 57
```

## Using the non-generic variant of JsonMapper.ToObject

When JSON data is to be read and a custom class that matches a particular data structure is not available or desired, users can use the non-generic variant of `ToObject`, which returns a `JsonData` instance.  `JsonData` is a general purpose type that can hold any of the data types supported by JSON, including lists and dictionaries.

```csharp
using LitJson;
using System;

public class JsonSample
{
    public static void Main()
    {
        string json = @"
          {
            ""album"" : {
              ""name""   : ""The Dark Side of the Moon"",
              ""artist"" : ""Pink Floyd"",
              ""year""   : 1973,
              ""tracks"" : [
                ""Speak To Me"",
                ""Breathe"",
                ""On The Run""
              ]
            }
          }
        ";

        LoadAlbumData(json);
    }

    public static void LoadAlbumData(string json_text)
    {
        Console.WriteLine("Reading data from the following JSON string: {0}",
                          json_text);

        JsonData data = JsonMapper.ToObject(json_text);

        // Dictionaries are accessed like a hash-table
        Console.WriteLine("Album's name: {0}", data["album"]["name"]);

        // Scalar elements stored in a JsonData instance can be cast to
        // their natural types
        string artist = (string) data["album"]["artist"];
        int    year   = (int) data["album"]["year"];

        Console.WriteLine("Recorded by {0} in {1}", artist, year);

        // Arrays are accessed like regular lists as well
        Console.WriteLine("First track: {0}", data["album"]["tracks"][0]);
    }
}
```

### Output from the example:

```json
Reading data from the following JSON string:
          {
            "album" : {
              "name"   : "The Dark Side of the Moon",
              "artist" : "Pink Floyd",
              "year"   : 1973,
              "tracks" : [
                "Speak To Me",
                "Breathe",
                "On The Run"
              ]
            }
          }

Album's name: The Dark Side of the Moon
Recorded by Pink Floyd in 1973
First track: Speak To Me
```