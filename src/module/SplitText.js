export const splitPara = (para) => {
    const arr = [];
    para.forEach((el) => {
        arr.push(el.split(" "));
    });
    return arr;
};
export const splitText = (string) => {
    const arr = string.split(" ");
    return arr;
};