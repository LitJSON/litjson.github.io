Title: Readers and Writers
Order: 20
---

An alternative interface to handling JSON data that might be familiar to some developers is through classes that make it possible to read and write data in a stream-like fashion. These classes are `JsonReader` and `JsonWriter`.

These two types are in fact the foundation of this library, and the `JsonMapper` type is built on top of them, so in a way, the developer can think of the reader and writer classes as the low-level programming interface for `LitJSON`.

## Using JsonReader

```csharp
using LitJson;
using System;

public class DataReader
{
    public static void Main()
    {
        string sample = @"{
            ""name""  : ""Bill"",
            ""age""   : 32,
            ""awake"" : true,
            ""n""     : 1994.0226,
            ""note""  : [ ""life"", ""is"", ""but"", ""a"", ""dream"" ]
          }";

        PrintJson(sample);
    }

    public static void PrintJson(string json)
    {
        JsonReader reader = new JsonReader(json);

        Console.WriteLine ("{0,14} {1,10} {2,16}", "Token", "Value", "Type");
        Console.WriteLine (new String ('-', 42));

        // The Read() method returns false when there's nothing else to read
        while (reader.Read()) {
            string type = reader.Value != null ?
                reader.Value.GetType().ToString() : "";

            Console.WriteLine("{0,14} {1,10} {2,16}",
                              reader.Token, reader.Value, type);
        }
    }
}
```

### Output from the example:

```
Token         Value             Type
------------------------------------------
ObjectStart                            
PropertyName  name              System.String
String        Bill              System.String
PropertyName  age               System.String
  Int         32                System.Int32
PropertyName  awake             System.String
Boolean       True              System.Boolean
PropertyName  n                 System.String
Double        1994.0226         System.Double
PropertyName  note              System.String
ArrayStart                            
String        life              System.String
String        is                System.String
String        but               System.String
String        a                 System.String
String        dream             System.String
ArrayEnd                            
ObjectEnd 
```

## Using JsonWriter

The `JsonWriter` class is quite simple. Keep in mind that if you want to convert some arbitrary object into a JSON string, you’d normally just use  `JsonMapper.ToJson`.

```csharp
using LitJson;
using System;
using System.Text;

public class DataWriter
{
    public static void Main()
    {
        StringBuilder sb = new StringBuilder();
        JsonWriter writer = new JsonWriter(sb);

        writer.WriteArrayStart();
        writer.Write(1);
        writer.Write(2);
        writer.Write(3);

        writer.WriteObjectStart();
        writer.WritePropertyName("color");
        writer.Write("blue");
        writer.WriteObjectEnd();

        writer.WriteArrayEnd();

        Console.WriteLine(sb.ToString());
    }
}
```

### Output from the example:

```json
[1,2,3,{"color":"blue"}]
```