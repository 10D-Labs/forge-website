#!/bin/bash

# Convert all exercise GIFs to WebM for better performance
# WebM files are typically 70-80% smaller than GIFs

FFMPEG="/c/Users/TGang/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-8.0.1-full_build/bin/ffmpeg.exe"
GIF_DIR="/c/Users/TGang/OneDrive/Documents/Forge/Website/public/exercises/gifs"
WEBM_DIR="/c/Users/TGang/OneDrive/Documents/Forge/Website/public/exercises/videos"

# Create videos directory if it doesn't exist
mkdir -p "$WEBM_DIR"

# Count total files
total=$(ls "$GIF_DIR"/*.gif 2>/dev/null | wc -l)
count=0

echo "Converting $total GIFs to WebM..."
echo "Output directory: $WEBM_DIR"
echo ""

for gif in "$GIF_DIR"/*.gif; do
    filename=$(basename "$gif" .gif)
    output="$WEBM_DIR/${filename}.webm"

    count=$((count + 1))

    # Skip if already converted
    if [ -f "$output" ]; then
        echo "[$count/$total] Skipping $filename.webm (already exists)"
        continue
    fi

    echo "[$count/$total] Converting $filename.gif..."

    "$FFMPEG" -i "$gif" \
        -c:v libvpx-vp9 \
        -crf 30 \
        -b:v 0 \
        -an \
        -loop 0 \
        -loglevel error \
        "$output"

    if [ $? -eq 0 ]; then
        gif_size=$(stat -c%s "$gif" 2>/dev/null || stat -f%z "$gif")
        webm_size=$(stat -c%s "$output" 2>/dev/null || stat -f%z "$output")
        reduction=$(echo "scale=0; 100 - ($webm_size * 100 / $gif_size)" | bc)
        echo "    ✓ Done (${reduction}% smaller)"
    else
        echo "    ✗ Failed"
    fi
done

echo ""
echo "Conversion complete!"

# Calculate total size difference
gif_total=$(du -sh "$GIF_DIR" | cut -f1)
webm_total=$(du -sh "$WEBM_DIR" | cut -f1)
echo "GIF folder: $gif_total"
echo "WebM folder: $webm_total"
