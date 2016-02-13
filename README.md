# Mapping US cities and zip codes

A map of the US that utilizes large data sets to map us cities. The JSON files are not practical for production use on a client machine, as they are between 1MB and 5MB. 

The JSON files were constructed by running a python script over the US Census Places (each state) and ZCTA (national) shapefiles.

The framework is Angular, and D3.js provides the svg mapping capabilities. (D3 is asynchronously loaded and provided by an Angular factory.)

RequireJS handles module dependencies.
