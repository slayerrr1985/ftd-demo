@echo off
echo timelines links: > links_timeline.txt
for /D %%v in (*) do echo ^<figure style="display:none" data-title=""^> ^<a href="../TIMELINE/%%v/content.timeline.json"^>^</a^> ^</figure^> >> links_timeline.txt






   