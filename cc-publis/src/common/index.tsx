/**
 * 全角から半角に置き換え
 *
 * 全角チルダ、全角波ダッシュ共に半角チルダに変換
 * 全角ハイフン、全角ダッシュ、全角マイナス記号は半角ハイフンに変換
 * 長音符は半角ハイフンに含めない（住所の地名等に使用される為）
 *
 * 今は良いがUnicode 8.0で波ダッシュの形が変わるみたいなので、波ダッシュを変換に
 * 含めるべきかどうかは検討が必要
 *
 * @param {String} str 変換したい文字列
 * @param {Boolean} tilde チルダ falseを指定した場合は変換なし
 * @param {Boolean} mark 記号 falseを指定した場合は変換なし
 * @param {Boolean} hankana 半角カナ記号 trueを指定した場合のみ変換
 * @param {Boolean} space スペース falseを指定した場合は変換なし
 * @param {Boolean} alpha 英字 falseを指定した場合は変換なし
 * @param {Boolean} num 数字 falseを指定した場合は変換なし
 */
export const zen2han = function(
  str: string,
  tilde: boolean = true,
  mark: boolean = true,
  hankana: boolean = true,
  space: boolean = true,
  alpha: boolean = true,
  num: boolean = true
) {
  if (alpha !== false) {
    str = str.replace(/[Ａ-Ｚａ-ｚ]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
  }
  if (num !== false) {
    str = str.replace(/[０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
  }
  if (mark !== false) {
    let reg = /[！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g;
    str = str
      .replace(reg, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
      })
      .replace(/[‐－―]/g, "-");
  }
  if (tilde !== false) {
    str = str.replace(/[～〜]/g, "~");
  }
  if (space !== false) {
    str = str.replace(/　/g, " ");
  }
  if (hankana === true) {
    // let map = { "。": "｡", "、": "､", "「": "｢", "」": "｣", "・": "･" } as any;
    const map = {
      ガ: "ｶﾞ",
      ギ: "ｷﾞ",
      グ: "ｸﾞ",
      ゲ: "ｹﾞ",
      ゴ: "ｺﾞ",
      ザ: "ｻﾞ",
      ジ: "ｼﾞ",
      ズ: "ｽﾞ",
      ゼ: "ｾﾞ",
      ゾ: "ｿﾞ",
      ダ: "ﾀﾞ",
      ヂ: "ﾁﾞ",
      ヅ: "ﾂﾞ",
      デ: "ﾃﾞ",
      ド: "ﾄﾞ",
      バ: "ﾊﾞ",
      ビ: "ﾋﾞ",
      ブ: "ﾌﾞ",
      ベ: "ﾍﾞ",
      ボ: "ﾎﾞ",
      パ: "ﾊﾟ",
      ピ: "ﾋﾟ",
      プ: "ﾌﾟ",
      ペ: "ﾍﾟ",
      ポ: "ﾎﾟ",
      ヴ: "ｳﾞ",
      ヷ: "ﾜﾞ",
      ヺ: "ｦﾞ",
      ア: "ｱ",
      イ: "ｲ",
      ウ: "ｳ",
      エ: "ｴ",
      オ: "ｵ",
      カ: "ｶ",
      キ: "ｷ",
      ク: "ｸ",
      ケ: "ｹ",
      コ: "ｺ",
      サ: "ｻ",
      シ: "ｼ",
      ス: "ｽ",
      セ: "ｾ",
      ソ: "ｿ",
      タ: "ﾀ",
      チ: "ﾁ",
      ツ: "ﾂ",
      テ: "ﾃ",
      ト: "ﾄ",
      ナ: "ﾅ",
      ニ: "ﾆ",
      ヌ: "ﾇ",
      ネ: "ﾈ",
      ノ: "ﾉ",
      ハ: "ﾊ",
      ヒ: "ﾋ",
      フ: "ﾌ",
      ヘ: "ﾍ",
      ホ: "ﾎ",
      マ: "ﾏ",
      ミ: "ﾐ",
      ム: "ﾑ",
      メ: "ﾒ",
      モ: "ﾓ",
      ヤ: "ﾔ",
      ユ: "ﾕ",
      ヨ: "ﾖ",
      ラ: "ﾗ",
      リ: "ﾘ",
      ル: "ﾙ",
      レ: "ﾚ",
      ロ: "ﾛ",
      ワ: "ﾜ",
      ヲ: "ｦ",
      ン: "ﾝ",
      ァ: "ｧ",
      ィ: "ｨ",
      ゥ: "ｩ",
      ェ: "ｪ",
      ォ: "ｫ",
      ッ: "ｯ",
      ャ: "ｬ",
      ュ: "ｭ",
      ョ: "ｮ",
      "。": "｡",
      "、": "､",
      ー: "ｰ",
      "「": "｢",
      "」": "｣",
      "・": "･"
    } as any;
    let reg = new RegExp("(" + Object.keys(map).join("|") + ")", "g");
    str = str.replace(reg, function(match: string) {
      return map[match];
    });
  }
  return str;
};
