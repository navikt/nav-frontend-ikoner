declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module 'get-contrast'{
    function score(color: string, backgroundColor: string): any;
    function ratio(color: string, backgroundColor: string): any;
}