# load-inputs-from-flie-action

```
      - uses: yongmams/load-inputs-from-flie-action@main
        with:
          file-path: |
            .github/config/common.json
            .github/config/${{ github.repository }}.json
        
      - name: show
        run: |
          echo "${{ env.message }}"!
          echo "${{ env.common_1 }}"!
          echo "${{ env.common_2 }}"!
```
