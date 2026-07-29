with open(r"c:\Users\shlok\Desktop\Portfolio\frontend\src\components\Hero.css", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'paintbrush-canvas' in line:
        print(f"Line {i+1}: {line.strip()}")
        # Print surrounding lines
        for j in range(max(0, i-5), min(len(lines), i+15)):
            print(f"  {j+1}: {lines[j].strip()}")
