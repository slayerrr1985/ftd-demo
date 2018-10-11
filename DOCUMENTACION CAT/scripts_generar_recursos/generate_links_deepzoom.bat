@echo off
echo deepzoom links: > links_deepzoom.txt
for /D %%v in (*) do echo ^<figure data-title=""^>^<a href="../DEEPZOOM/%%v/content.deepzoom.json"^>xxxxxxxxxxxxxxxxxxx^</a^>^</figure^> >> links_deepzoom.txt