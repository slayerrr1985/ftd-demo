@echo off
echo presentation links: > links_presentation.txt
for /D %%v in (*) do echo ^<section^>^<widget class="widget" data-href="PRESENTATION/%%v/data.json" data-title="" data-thumb="PRESENTATION/%%v/images/"^>^</widget^>^</section^> >> links_presentation.txt





   