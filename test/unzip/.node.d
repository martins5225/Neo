cmd_Release/.node := c++ -bundle -undefined dynamic_lookup -Wl,-search_paths_first -mmacosx-version-min=10.15 -arch x86_64 -L./Release -stdlib=libc++  -o Release/.node  
