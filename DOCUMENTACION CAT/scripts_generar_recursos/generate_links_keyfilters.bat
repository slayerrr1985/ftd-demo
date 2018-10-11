@echo off
echo keyfilter links COMO WIDGET: > links_keyfilter.txt
for /D %%v in (*) do echo ^<section^>^<widget class="widget" data-href="KEYFILTER/%%v/keyFilterData.json" data-title="" data-thumb=""^>^</widget^>^</section^> >> links_keyfilter.txt
echo: >> links_keyfilter.txt
echo keyfilter links COMO FIGURE: >> links_keyfilter.txt
for /D %%v in (*) do echo ^<figure data-title="" data-thumb=""^>^<a href="../KEYFILTER/%%v/keyFilterData.json"^>Keyfilter link^</a^>^</figure^> >> links_keyfilter.txt
