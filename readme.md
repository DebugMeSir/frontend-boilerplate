# Cách dùng boilerplate

## Info: boilerplate đã có sẵn các thư viện

- tailwind
- bootstrap
- font-awesome
- glide (slider)

## Trực tiếp viết css

- các class atomic css được viết theo tinh thần của css design pattern theo như ghi chú ở trang

[Css design pattern](https://www.notion.so/Css-design-pattern-5d6f86b7c64f45c693c8aaa83edb6bca)

- file fonts offline: otf, ttf nhét vào project/fonts
- ảnh nhét vào project/img
- tạo các file sau rồi dùng auto để import hết file css trong project/css vô project/css/main.scss
  - import font google thì nhét vào project\css\vendor\import-font.scss
  - Các variable khác của theme như màu sắc, padding…. thì nhét vào project/css/variables.scss
  - các atomic css thì nhét vào thư mục project/css/atomic
    - editor-ready.scss là chuyên để style trước cho những thành phần trong bài viết mà người dùng sẽ viết bài và nó đc style tương ứng, những trường hợp này k thể chèn class vào đc, vì div là do editor tự sản sinh ra. nên file này là cần thiết. và để các thành phần này đc thóng nhất thì ta dùng css variable hoặc extend class nhỏ vào. Cái này phải import sau cùng (trên flex) vì để extend những class nhỏ lẻ trước thì calss nhỏ phải đc define trước
    - cái file flex.scss phải import cuối để mấy cái media query còn đè lên width của div, width của flex child thay đổi sml nên phải tách class ra
      ```jsx
      .flex{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;

          &-align-center{
              align-items: center;
          }
      &-child{



          @media (max-width: $tablet-width){
              width: 48.5%;
          }
          @media (max-width: $mobile-width){
              width: 100%;
          }
      }
      ```
    - k cần tách media query ra file scss riêng, mà nên viết chung vô cái file sass lẻ, ngay chỗ item đang làm để dễ tư duy , với lại sass nó cũng làm media query bớt rườm ra như css rồi nên k có j phải ngại. mà số lượng file sass khi chia nhỏ ra cũng đã nhiều lắm rồi đừng có thêm media qurry cho từng cái file nhỏ đấy nữa huhuhuhu
      ```scss
      .whole-doc-position {
        width: 1140px;
        margin: auto;
        max-width: $large-pc-width;
        @media (max-width: $mobile-width) {
          width: 570px;
        }
      }
      ```
  - Các semantic css thì nhét vào thư mục project/css/semantic
- tạo các file sau rồi dùng auto để import hết file ejs trong project/ejs vào file project/ejs/index.ejs
  - ejs nhét vào project/ejs/parts rồi import
- js nhét vào project/js rồi dùng auto để compile zô main.js

## Các lệnh cần chạy

Xem ở sau đây hoặc vào package.json mà tìm các “scripts” mà chạy “npm run script”

- Trong quá trình viết thì dùng các lệnh sau, mỗi lệnh 1 tab terminal
  - nodemon + ejs
    ```jsx
    nodemon ejs.config.js -e js,ejs,json,css,scss
    ```
  - sass watch
    ```jsx
    sass --watch ./project/css/main.scss style.css
    ```
  - tailwind
    ```jsx
    npx tailwindcss -i ./project/css/vendor/tailwind/input.css -o ./project/css/vendor/tailwind/output.css --watch
    ```
  - auto import các thứ
    ```jsx

    ```
- Viết xong thì chạy các lệnh sau
  - purge
    ```jsx
    purgecss --css style.css --content index.html --output style-purged.css
    ```
  - autoprefixer
    ```jsx
    npx postcss style-purged.css --use autoprefixer >  style-prefix.css
    ```

# list thư viện dùng

- trước khi code
  - tailwind: global đc, dùng npx
  - bootstrap: Download source files về, đừng sài cdn hay compile
  - font-awesome: down source về để còn purge. Down cả file zip nhưng chỉ cần sài `all.css` với thư mục `webfonts` thôi, mấy cái file font ở trong webfonts thì đc reference trong all.css bằng lệnh @font-face ở đoạn cuối file all.css nhưng mà phải sửa lại relative path trong all.css vì mình sẽ compile css vô style.css ở path khác nênđoạn font face sẽ đứng ở 1 chỗ khác mà nhìn ra thư mục webfonts
  - normalize css /reset css: tùy, nếu cài tailwind / bootstrap thì thôi
- trong khi code
  - nodemon: global đc
  - sass: global đc. Import file phải xóa ext
  - ejs: **phải local**
- khi code xong
  - purgecss: global được
  - postcss postcss-cli autoprefixer: global
