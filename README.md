# image-search
## Free Code Camp Image Search Abstraction Layer Project

Search the Imgur main gallery by adding a search term, or multiple search terms to the /imagesearch route:

```
http://hostname/imagesearch/silly cats
http://hostname/imagesearch/silly%20cats
```

To page through results, add ?offset=# to the search:

```
http://hostname/imagesearch/silly%20cats?offset=2
```

Results will be JSON-formatted and include an images array, which holds an object for each result with "title", "description", and "link" fields:
```
{
  "images": [
    {
      "title": "Silly gamer cat",
      "description": "I bet she doesn't even know how to play.",
      "link": "http://i.imgur.com/4bMsZoa.jpg"
    },
    {
      "title": "Silly cat!",
      "description": "Jedi forgot to put his tongue away.",
      "link": "http://i.imgur.com/WsCptOC.jpg"
    }
  ]
}
```

If there are no results, the images array will be empty.

The app saves each search along with a timestamp, and the most recent 50 searches can be accessed at:
```
http://hostname/latest/imagesearch/

[
  {
    "term": "silly cat",
    "timestamp": "2016-02-13T20:49:45.693Z"
  },
  {
    "term": "weird animals",
    "timestamp": "2016-02-13T20:34:12.852Z"
  }
]
```

#### Reference:
#### https://api.imgur.com/
#### On GitHub at:
#### https://github.com/nicolefffe/image-search
