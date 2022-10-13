# Cách dùng boilerplate

## Có sẵn các thư viện
- tailwind
## Chưa có  / TODO
- bootstrap
- font-awesome
- glide (slider)
- xóa comment css, uglify css
- kết hợp file js lại, uglify js
## Cách dùng
- Viết code vào thư mục: project/source
- Chạy lệnh `npm run whilecode` để nó render ra html với css bình thường ra thư mục project/render
- Khi code xong, chạy lệnh `npm run aftercode` để nó purge css không cần thiết và thêm autoprefixer, input và output đều là file project/render/style.css
## Architecture
- Kết quả chỉ 1 file css
  - CSS tự nghĩ thì viết theo SASS, tất cả đều có đuôi .scss, bot tự tìm rồi compile tất cả scss trong thư mục project/source/css rồi ném vào project/render/style.css
  - tailwind thì chỉ cần thêm setting vào file tailwind.config.js, rồi bot tự compile rồi ném vào project/render/style.css
- Kết quả là nhiều file html
  - HTML viết bằng EJS, đuôi .ejs, bot tự tìm tất cả file ejs trong project/source/ejs, trừ thư mục project/source/ejs/parts, rồi convert sang file .html với tên giống tên file .ejs tương ứng, ném vào thư mục project/render/
