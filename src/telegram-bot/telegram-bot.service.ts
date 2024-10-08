import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
  private readonly logger = new Logger(TelegramBotService.name);
  private bot: TelegramBot;

  constructor() {
    const token = process.env.TELEGRAM_TOKEN; 
    this.bot = new TelegramBot(token, { polling: true }) as TelegramBot; 
    this.setCommands();
    this.handleMessages();
  }

  private setCommands() {
    this.bot.setMyCommands([
      { command: '/start', description: 'Начальное приветствие' },
    ]);
  }

  private handleMessages() {
    const noCommand = `<strong>Я тебя не понимаю</strong>\n<i>выберете раздел</i>`;

    this.bot.on('message', async (msg) => {
      const text = msg.text;
      const chatId = msg.chat.id;

      try {
        if (text === '/start' || text === 'вернуться назад') {
          await this.bot.sendPhoto(
            chatId,
            'https://retina-center.ru/wp-content/uploads/2022/10/sloi-setchatki-400x218.jpg',
          );
          return this.bot.sendMessage(
            chatId,
            'Добро пожаловать в телеграмм бот автора Ahiles. Здесь храняться краткие сведения о нормальной структуре сетчатки и обследование её на ОКТ',
            {
              reply_markup: {
                keyboard: [
                  [{ text: 'Анатомия и Гистология сетчатки' }],
                  [{ text: 'Нормы ОКТ сетчатки' }],
                  [{ text: 'Патология ОКТ сетчатки' }],
                ],
              },
            },
          );
        }

        if (text === 'Анатомия и Гистология сетчатки') {
          await this.bot.sendPhoto(
            chatId,
            'https://excimerclinic.ru/upload/image/retina-normal.jpg',
          );
          return this.bot.sendMessage(chatId, 'Анатомия и Гистология сетчатки', {
            reply_markup: {
              keyboard: [
                [{ text: 'Анатомия сетчатки' }],
                [{ text: 'Гистология сетчатки' }],
                [{ text: 'вернуться назад' }],
              ],
            },
          });
        }

        if (text === 'Анатомия сетчатки') {
          await this.bot.sendPhoto(chatId, 'https://files.eyepress.ru/0007493/44074p01.jpg');
          return this.bot.sendMessage(chatId, 'Cетчатка (retina) – тонкая прозрачная структура, выстилающая всю поверхность сосудистой оболочки и контактирующая со стекловидным телом. Выделяют оптическую (pars optica retinae) и редуцированную реснично-радужковую (pars ciliaris et iridica retinae) части сетчатки. Оптическая часть воспринимает свет и является высокодифференцированной нервной тканью, почти на всем протяжении состоящей из 10 слоев. Она располагается от диска зрительного нерва до плоской части цилиарного тела и заканчивается зубчатой линией (ora serrata). Затем сетчатка редуцирует до двух слоев, теряет свои оптические свойства и выстилает внутреннюю поверхность цилиарного тела и радужки.', {
            reply_markup: {
              keyboard: [[{ text: 'вернуться назад' }]],
            },
          });
        }
        if (text === 'Гистология сетчатки') {
            await this.bot.sendPhoto(chatId, 'http://mcoz.kz/images/img/eye-ear-2013_13.jpg');
            return this.bot.sendMessage(chatId, 'Внутренний плексиформный слой, слой ганглиозных, или мультиполярных, клеток и слой нервных волокон формируют комплекс ганглиозных клеток или внутреннюю сетчатку. Внутренняя пограничная мембрана — это тонкая мембрана, которая образуется отростками клеток Мюллера и прилежит к слою нервных волокон. Слой нервных волокон формируется отростками ганглиозных клеток, которые идут до зрительного нерва. Поскольку этот слой образован горизонтальными структурами, от имеет повышенную рефлективность. Слой ганглиозных, или мультиполярных, клеток состоит из очень объемных клеток. Внутренний плексиформный слой образован отростками нервных клеток, здесь расположены синапсы биполярных и ганглиозных клеток. Благодаря множеству горизонтально идущих волокон этот слой на томограммах имеет повышенную рефлективность и разграничивает внутреннюю и наружную сетчатку.', {
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }
        if (text === 'Нормы ОКТ сетчатки') {
            await this.bot.sendPhoto(chatId, 'https://www.vseozrenii.ru/upload/images_schools/vmd/12/okt-setchatka-v-norme-3.jpg');
            await this.bot.sendPhoto(chatId, 'https://www.imaios.com/i/var/site/storage/images/5/6/7/4/474765-8-rus-RU/eye-optical-coherence-tomography.jpg?caption=1&ixlib=php-3.3.1&q=75&w=1280');
            return this.bot.sendMessage(chatId, 'Сетчатка и хориоидея являются многослойными мембранами. На В-сканах здоровой сетчатки можно увидеть слои нервных волокон, ганглиозных клеток, внутренний плексиформный слой, внутренний ядерный слой (биполярных и горизонтальных клеток), наружный плексиформный слой. Далее расположены: наружный ядерный слой, состоящий из ядер фоторецепторов, наружная пограничная мембрана, линия сочленения наружных и внутренних сегментов фоторецепторов, комплекс пигментного эпителия — хориокапилляров, хориоидея, включающая слой средних сосудов Саттлера и слой крупных сосудов Галлера, склера. Важной деталью является линия сочленения наружных и внутренних сегментов фоторецепторов. Эта линия не визуализируется на гистологическом срезе. Кроме того, на томограмме можно наблюдать наружную пограничную мембрану, которая идет параллельно линии сочленения наружных и внутренних сегментов фоторецепторов, располагаясь между этой линией и телами клеток фоторецепторов. ', {
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }
        if (text === 'Патология ОКТ сетчатки') {
            return this.bot.sendMessage(chatId, 'Патологический состоний сетчатки очень много и ОКТ наиболее достоверный метод',{
                reply_markup: {
                    keyboard: [
                        [{ text: 'ВМД'}], [{ text: 'макулярный отек (Ирвинга-Гасса)'}],
                        [{ text: 'ЦСХРП'}], [{ text: 'Диабетическая ретинопатия'}],
                        [{ text: 'вернуться назад'}],
                    ]
                }
            });
        }
        if (text === 'ВМД') {
            await this.bot.sendPhoto(chatId, 'https://klinikarassvet.ru/upload/images/vmd-6.jpg');
            return this.bot.sendMessage(chatId, 'Возрастная макулярная дегенерация (ВМД) характеризуется необратимым прогрессирующим поражением центральной фотоактивной зоны сетчатки. Классификация ВМД строится в основном на этапах развития дистрофического процесса. Кацнельсон Л.А. с соавт. различают 3 формы заболевания: \n' +
                '\n' +
                '1. Неэкссудативная (сухая) форма: ретинальные друзы, дефекты пигментного эпителия, перераспределение пигмента, атрофия пигментного эпителия и хориокапиллярного слоя.\n' +
                '\n' +
                '2. Экссудативная (влажная) форма: стадия экссудативной отслойки пигментного эпителия; стадия экссудативной отслойки нейроэпителия; неоваскулярная стадия; стадия экссудативно–геморрагической отслойки пигментного эпителия и нейроэпителия.\n' +
                '\n' +
                '3. Рубцовая стадия. ',{
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }
        if (text === 'макулярный отек (Ирвинга-Гасса)') {
            await this.bot.sendPhoto(chatId, 'https://retina-center.ru/images/oct-norma-kistozniy-otek.jpg');
            await this.bot.sendPhoto(chatId, 'https://files.eyepress.ru/0004451/22632p11.jpg');
            return this.bot.sendMessage(chatId, 'Макулярным называется отёк в центральной зоне сетчатки глаза – макуле, если жидкость скапливается в полостях в наружном ядерном слое сетчатой оболочки, его называют «кистозным». Он возникает преимущественно вследствие воспалительных процессов, в том числе, после хирургических вмешательств и манипуляций на глазном яблоке. Кистозный макулярный отёк развивается спустя 1-3 месяца после операции. Часто его называют синдромом Ирвина-Гасса.',{
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }
        if (text === 'ЦСХРП') {
            await this.bot.sendPhoto(chatId, 'https://legeartis-don.ru/content/images/Screenshot_19(1).png');
            await this.bot.sendPhoto(chatId, 'https://files.eyepress.ru/0004754/24112p01.jpg');
            return this.bot.sendMessage(chatId, 'Центральная серозная хориоретинопатия (ЦСХРП) —  заболевание, которое поражает центральную часть сетчатки (макулу) и возникает после микроскопического разрыва в ее пигментном слое. Жидкость из сосудистой оболочки глаза, просачивается через разрыв под сетчатку, вызывая ее отек и расслоение. ',{
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }
        if (text === 'Диабетическая ретинопатия') {
            await this.bot.sendPhoto(chatId, 'https://files.eyepress.ru/0004451/22634p12.jpg');
            await this.bot.sendPhoto(chatId, 'https://r-optics.ru/upload/iblock/d-retinopatiya2.jpg');
            return this.bot.sendMessage(chatId, 'Диабетическая ретинопатия — осложнение сахарного диабета 1 и 2 типа при его длительной декомпенсации. Проявляется прогрессирующим поражением сосудов глазного дна. Ретинопатия сопровождается их постепенным разрушением, микроскопическими аневризмами, кровоизлияниями в окружающие ткани, атипичным разрастанием капилляров. КЛАССИФИКАЦИЯ, СТАДИИ ДИАБЕТИЧЕСКОЙ РЕТИНОПАТИИ\n' +
                'Пролиферация тканей — это их разрастание. Потому, по общепринятой классификации, течение ретинопатии у диабетиков разделяют на три стадии.\n' +
                '\n' +
                'Непролиферативная. Характерными чертами начальной степени являются патологические изменения структуры сетчатки глаз — небольшие аневризмы, очаги экссудата, кровоизлияния. На этом этапе диагностируется отечность тканей.\n' +
                'Препролиферативная. Сопровождается явными венозными и капиллярными аномалиями — появлением узелков, петель артериол, извитости сосудов. Возможны крупные кровоизлияния на поверхности сетчатки.\n' +
                'Пролиферативная. Характеризуется аномальным разрастанием мелких сосудов диска зрительного нерва и других отделов сетчатки. Поскольку новообразованные капилляры отличаются хрупкостью и тонкостью стенок, их появление повышает риск кровоизлияний. Повторные геморрагии способствуют образованию фиброзной ткани, рубцов. Это может привести к возникновению глаукомы, атрофии и отслоению сетчатой оболочки.',{
                reply_markup: {
                    keyboard: [[{ text: 'вернуться назад' }]],
                }
            });
        }

        return this.bot.sendMessage(chatId, noCommand, {
          parse_mode: 'HTML',
        });
      } catch (error) {
        this.logger.error('Error handling message', error);
      }
    });
  }
}
