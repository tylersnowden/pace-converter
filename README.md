# My Pace Converter 

I like tracking my runs and bike rides in kilometers, but I'm more familiar with minutes/mile pace as are my friends. However, for some reason pace conversion doesn't exist many places online, and if they do, the UI is convoluted. So in order to keep track of my pace in both, I created this simple converter.

## My Pace Converter API

I also created this simple API in case myself or anyone else could find it useful.

### API Documentation

https://mypaceconverter/to-km?pace=8:50

Returns:
`
{ "5:29" }
`

https://mypaceconverter/to-miles?pace=5:29

Returns:
`
{ "8:49" }
`
