import { useEffect, useMemo, useState } from 'react';

const menuData = [
  { id: 1, name: 'Суп ассорти 200г', category: 'soup', price: 80, kcal: 150, image: 'https://img.iamcook.ru/old/upl/recipes/cat/u-d7606d7a68a7365d1911bcfa29f64b4a.JPG' },
  { id: 2, name: 'Суп ассорти 300г', category: 'soup', price: 100, kcal: 220, image: 'https://img.iamcook.ru/old/upl/recipes/cat/u-d7606d7a68a7365d1911bcfa29f64b4a.JPG' },
  { id: 3, name: 'Солянка 200г', category: 'soup', price: 90, kcal: 180, image: 'https://img.iamcook.ru/2021/upl/recipes/cat/u-8411276647d2d9f43962f916f61772be.jpg' },
  { id: 4, name: 'Солянка 300г', category: 'soup', price: 120, kcal: 260, image: 'https://img.iamcook.ru/2021/upl/recipes/cat/u-8411276647d2d9f43962f916f61772be.jpg' },
  { id: 5, name: 'Котлета гов. 100г', category: 'hot', price: 140, kcal: 280, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3c6HAKq_prb_ITMoN8Z7CWXbS8QCSeeEOpQ&s' },
  { id: 6, name: 'Зраза масло/сыр', category: 'hot', price: 160, kcal: 320, image: 'https://images.gastronom.ru/hU9_FbDX0FOONx8e_qNgCJD45WIy5eRMTiuEuCKoo4Q/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzQ3MmFmMGVhLTkyNTUtNGM5OC05MzU4LTYwOTVmZmQ1OTBiZC5qcGc.webp' },
  { id: 7, name: 'Гнездо', category: 'hot', price: 160, kcal: 300, image: 'https://images.gastronom.ru/E8fr75XaLj-EtZ-0Z5H-92kRQsRkwHMG0vw_17oooPY/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzY2ZGFmOTdlLThkMDItNGFiZi1hYWQxLTg2NDRlNTU2ZjhjMC5qcGc.webp' },
  { id: 8, name: 'Котлета мясная', category: 'hot', price: 120, kcal: 250, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaGHmp4Itd3sIyyFQX_8CsnEZp4ZDUv_pOw&s' },
  { id: 9, name: 'Котлета куриная', category: 'hot', price: 120, kcal: 220, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXmfV9rgbq0jNb7sdUfoXdMb8tmCXyCI_BFg&s' },
  { id: 10, name: 'Отбивная из свинины', category: 'hot', price: 150, kcal: 310, image: 'https://lefood.menu/wp-content/uploads/w_images/2023/11/recept-96044-1240x827.jpg' },
  { id: 11, name: 'Отбивная куриная', category: 'hot', price: 150, kcal: 270, image: 'https://prostokvashino.ru/upload/resize_cache/iblock/b73/800_800_0/b735e11834bd050a1a7121cf8da16868.jpg' },
  { id: 12, name: 'Гуляш говяжий', category: 'hot', price: 200, kcal: 240, image: 'https://myasoed.market/upload/w_645/69c3ec184239b-glCopy.jpg' },
  { id: 13, name: 'Гуляш из свинины', category: 'hot', price: 140, kcal: 280, image: 'https://opis-cdn.tinkoffjournal.ru/mercury/04-pork-goulash.jpg' },
  { id: 14, name: 'Печень говяжья', category: 'hot', price: 190, kcal: 210, image: 'https://s0.rbk.ru/v6_top_pics/media/img/2/27/347619531429272.webp' },
  { id: 15, name: 'Печень куриная', category: 'hot', price: 120, kcal: 190, image: 'https://static.1000.menu/img/content-v2/6d/d6/39956/kurinaya-pechen-s-lukom-na-skovorode-jarenaya_1645250798_4_max.jpg' },
  { id: 16, name: 'Оладья 120г', category: 'baking', price: 160, kcal: 350, image: 'https://img.iamcook.ru/2018/upl/recipes/cat/u-305929b9bb27384dbaff4c7ecb60db3f.JPG' },
  { id: 17, name: 'Гарнир 100г', category: 'garnish', price: 80, kcal: 200, image: 'https://kopilka-kulinara.ru/upload/information_system_57/5/0/3/item_5038/item_5038.webp' },
  { id: 18, name: 'Салат овощной', category: 'salad', price: 70, kcal: 80, image: 'https://www.batoni-kafe.ru/images/cms/data/products-fo/salaty/100001314_salat_ovownoj_po-domashnemu.webp' },
  { id: 19, name: 'Салат мясной', category: 'salad', price: 80, kcal: 150, image: 'https://vkusno-raznosti.ru/wp-content/uploads/2017/07/salat-govyadina-s-ogurcami-42.jpg' },
  { id: 20, name: 'Минтай 100г', category: 'fish', price: 180, kcal: 140, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVgEchOHJU056pfEC4y5y5_BquwJUc4VQpiw&s' },
  { id: 21, name: 'Люля 100г', category: 'hot', price: 150, kcal: 250, image: 'https://images.gastronom.ru/KJvxolCZE-P2DEGtFQVNwBINDNWt1xfVDZ6nTy233lY/pr:article-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2I4YWI1YmVkLTM0NjMtNDRiMy05ODdjLTk5Mzc2NDUyY2I2ZS5qcGc.webp' },
  { id: 22, name: 'Куриный рулет', category: 'hot', price: 170, kcal: 230, image: 'https://img.iamcook.ru/2020/upl/recipes/cat/u839-0f691a04d6aa73da06c7345283694300.JPG' },
  { id: 23, name: 'Сочник', category: 'baking', price: 80, kcal: 300, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaPEYj62Tp0pLre8M7hojwcL3GNPkIyqDUzNKVtL2_BDctWkfALCR7-tog&s=10' },
  { id: 24, name: 'Плов 230г', category: 'hot', price: 170, kcal: 420, image: 'https://images.gastronom.ru/aovMYcGLbHtuJwEZdn2yUPxww-dA-zfM3dexGT3u-JY/pr:content-group-preview-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzL2U3ODk0OGExLWE0ZjQtNGRjNS1hZjNiLTQ2MmNhMmY5ODgyNi5qcGc.webp' },
  { id: 25, name: 'Голубец', category: 'hot', price: 120, kcal: 200, image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Holubtsi.jpg' },
  { id: 26, name: 'Бифштекс с яйцом', category: 'hot', price: 140, kcal: 350, image: 'https://images.gastronom.ru/JI21GFgrLRrX3LZsUl0To7e6iD-Tx3DPV7fHq0WCNaM/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzY0Y2U0MzA5LWI3NGUtNDg5Ny1hOTU3LTIyNzgwNTQ0ZjczYi5qcGc.webp' },
  { id: 27, name: 'Зразы', category: 'hot', price: 140, kcal: 310, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5V_PSEh3RdqMckHo8GmeqqJbru-gD0L7kpg&s' },
  { id: 28, name: 'Макароны по-флотски', category: 'hot', price: 160, kcal: 450, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR_QnmWwJWyAF5ubXCNPIrbKYbhyqw3HdDMw&s' }
];

const categories = [
  { key: 'all', label: '🌟 Все' },
  { key: 'soup', label: '🥣 Супы' },
  { key: 'hot', label: '🍲 Горячее' },
  { key: 'garnish', label: '🍚 Гарниры' },
  { key: 'salad', label: '🥗 Салаты' },
  { key: 'fish', label: '🐟 Рыба' },
  { key: 'baking', label: '🥐 Выпечка' }
];

const districts = ['Экодолье', 'Ивановка', 'Приуралье'];

function formatMoney(value) {
  return `${value} ₽`;
}

function getPhoneFromUser(user) {
  return (
    user?.phone_number ||
    user?.phone ||
    user?.phoneNumber ||
    user?.contact?.phone_number ||
    user?.contact?.phone ||
    user?.contact?.phoneNumber ||
    ''
  );
}

function getMaxUserInfo() {
  if (typeof window !== 'undefined' && window.WebApp?.initDataUnsafe) {
    const data = window.WebApp.initDataUnsafe;
    return {
      id: data.user?.id ?? 'unknown',
      username: data.user?.username ?? 'unknown',
      fullName: `${data.user?.first_name ?? ''}${data.user?.last_name ? ' ' + data.user.last_name : ''}`.trim() || 'Гость',
      phone: getPhoneFromUser(data.user),
      chatId: data.chat?.id ?? null,
      chatType: data.chat?.type ?? null
    };
  }
  return { id: 'unknown', username: 'unknown', fullName: 'Гость', phone: '', chatId: null, chatType: null };
}

function buildOrderMessage(order, userInfo) {
  const lines = [
    `Новый заказ от ${userInfo.fullName}`,
    `Телефон: ${order.phone}`,
    `Адрес: ${order.address}`,
    `Дата: ${order.date}`,
    '',
    'Состав заказа:'
  ];

  order.items.forEach(item => {
    lines.push(`- ${item.name} x${item.quantity} = ${formatMoney(item.price * item.quantity)}`);
  });

  lines.push('', `Итого: ${formatMoney(order.total)} · ${order.kcal} ккал`);
  return lines.join('\n');
}

function getWebAppBridgeSender() {
  if (typeof window === 'undefined' || !window.WebApp) {
    return null;
  }

  const roots = [
    { target: window.WebApp, label: 'WebApp' },
    { target: window.WebApp.transport, label: 'WebApp.transport' },
    { target: window.WebApp.requestController, label: 'WebApp.requestController' }
  ];

  const preferredNames = [
    'sendData',
    'postMessage',
    'sendMessage',
    'send',
    'request',
    'sendRequest',
    'invoke',
    'dispatch',
    'emit'
  ];

  const candidates = [];
  const collectKeys = target => {
    const keys = new Set();
    let current = target;
    while (current && current !== Object.prototype) {
      Reflect.ownKeys(current).forEach(key => {
        if (typeof key === 'string') {
          keys.add(key);
        }
      });
      current = Object.getPrototypeOf(current);
    }
    return [...keys];
  };

  for (const root of roots) {
    if (!root.target || typeof root.target !== 'object') {
      continue;
    }
    for (const key of collectKeys(root.target)) {
      const value = root.target[key];
      if (typeof value === 'function') {
        candidates.push({ root: root.target, methodName: key, label: `${root.label}.${key}` });
      }
    }
  }

  const match = candidates.find(item => preferredNames.includes(item.methodName));
  const transportMatch = candidates.find(item => item.label.startsWith('WebApp.transport'));
  const requestMatch = candidates.find(item => item.label.startsWith('WebApp.requestController'));
  const fallback = match || transportMatch || requestMatch || candidates[0];

  if (fallback) {
    const isJsonMethod = /post|message/i.test(fallback.methodName) && !/request|sendRequest|invoke|dispatch|emit/i.test(fallback.methodName);
    const isRequestLike = /request|sendRequest|invoke|dispatch|emit/i.test(fallback.methodName);

    const buildRequestArg = payload => ({
      requestId: `order_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      action: payload.action || 'send_to_manager_chat',
      data: payload
    });

    const trySend = async payload => {
      const attempts = [];
      if (isRequestLike) {
        attempts.push(() => fallback.root[fallback.methodName].call(fallback.root, buildRequestArg(payload)));
      }
      if (isJsonMethod) {
        attempts.push(() => fallback.root[fallback.methodName].call(fallback.root, JSON.stringify(payload)));
      }
      attempts.push(() => fallback.root[fallback.methodName].call(fallback.root, payload));
      attempts.push(() => fallback.root[fallback.methodName].call(fallback.root, payload, {}));

      let lastError;
      for (const attempt of attempts) {
        try {
          const result = attempt();
          return await Promise.resolve(result);
        } catch (err) {
          lastError = err;
        }
      }
      throw lastError;
    };

    return {
      methodName: fallback.methodName,
      label: fallback.label,
      send: trySend
    };
  }

  return null;
}

async function sendOrderToManager(order) {
  const userInfo = getMaxUserInfo();
  const text = buildOrderMessage(order, userInfo);
  const managerChatId = import.meta.env.VITE_MANAGER_CHAT_ID || userInfo.chatId;
  const orderEndpoint = import.meta.env.VITE_ORDER_ENDPOINT || '/order';

  if (!managerChatId) {
    throw new Error('managerChatId не задан. Укажите VITE_MANAGER_CHAT_ID.');
  }

  const payload = {
    chat_id: managerChatId,
    text,
    order,
    user: userInfo
  };

  const response = await fetch(orderEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Order proxy failed: ${response.status} ${body}`);
  }

  return response.json();
}

export default function App() {
  const [privacyAccepted, setPrivacyAccepted] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('privacyAccepted') === 'true';
  });
  const [currentCategory, setCurrentCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [district, setDistrict] = useState('Ивановка');
  const [address, setAddress] = useState('ул. Центральная, 5');
  const [phone, setPhone] = useState(() => getMaxUserInfo().phone || '');
  const [phoneError, setPhoneError] = useState(false);
  const [userInfo, setUserInfo] = useState(() => getMaxUserInfo());
  const [platform, setPlatform] = useState('web');
  const [launchContext, setLaunchContext] = useState('default');
  const [contactRequested, setContactRequested] = useState(false);
  const [isSendingOrder, setIsSendingOrder] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('info');

  const filteredMenu = useMemo(
    () => (currentCategory === 'all' ? menuData : menuData.filter(item => item.category === currentCategory)),
    [currentCategory]
  );

  const cartTotals = useMemo(() => {
    return cart.reduce(
      (totals, item) => {
        totals.items += item.quantity;
        totals.price += item.price * item.quantity;
        totals.kcal += item.kcal * item.quantity;
        return totals;
      },
      { items: 0, price: 0, kcal: 0 }
    );
  }, [cart]);

  const openCart = () => setCartOpened(true);
  const closeCart = () => setCartOpened(false);
  const openCheckout = () => {
    if (cart.length === 0) {
      setStatusMessage('Добавьте блюда в корзину, чтобы оформить заказ.');
      setStatusType('error');
      return;
    }
    setPhoneError(false);
    setStatusMessage('');
    setCheckoutOpened(true);
  };
  const closeCheckout = () => setCheckoutOpened(false);

  useEffect(() => {
  if (!window.WebApp) return;

  const info = getMaxUserInfo();

  setUserInfo(info);

  if (!phone && info.phone) {
    setPhone(info.phone);
  }

  if (window.WebApp.platform) {
    setPlatform(window.WebApp.platform);
  }

  if (window.WebApp.getLaunchContext) {
    window.WebApp
      .getLaunchContext()
      .then(ctx => setLaunchContext(ctx.entryPoint ?? 'default'))
      .catch(() => setLaunchContext('default'));
  }
}, []);

useEffect(() => {
  if (!window.WebApp?.BackButton) return;

  const backHandler = () => {
    if (checkoutOpened) {
      setCheckoutOpened(false);
      return;
    }

    if (cartOpened) {
      setCartOpened(false);
      return;
    }

    window.WebApp.close?.();
  };

  if (checkoutOpened || cartOpened) {
    window.WebApp.BackButton.show?.();
  } else {
    window.WebApp.BackButton.hide?.();
  }

  if (window.WebApp.BackButton.onClick) {
    window.WebApp.BackButton.onClick(backHandler);
  }

  return () => {
    if (window.WebApp.BackButton.offClick) {
      window.WebApp.BackButton.offClick(backHandler);
    }
  };
}, [cartOpened, checkoutOpened]);

  const getMaxContactRequestMethod = () => {
    if (typeof window === 'undefined' || !window.WebApp) {
      return null;
    }
    const names = [
      'requestContact',
      'requestContactFromMax',
      'requestPhone',
      'requestPhoneNumber',
      'requestUserContact'
    ];
    for (const name of names) {
      if (typeof window.WebApp[name] === 'function') {
        return window.WebApp[name].bind(window.WebApp);
      }
    }
    return null;
  };

  const requestContactFromMax = async () => {
    const requestContact = getMaxContactRequestMethod();
    if (!requestContact) {
      setStatusMessage('MAX Bridge не доступен для запроса номера.');
      setStatusType('error');
      return;
    }

    setContactRequested(true);
    setStatusMessage('Запрашиваю номер из MAX...');
    setStatusType('info');

    try {
      const response = await requestContact();
      const phoneFromMax = response?.phone || response?.phone_number || response?.phoneNumber || response?.contact?.phone || getPhoneFromUser(response?.contact);
      if (phoneFromMax) {
        setPhone(phoneFromMax);
        setPhoneError(false);
        setStatusMessage('Номер успешно получен из MAX.');
        setStatusType('success');
      } else {
        setStatusMessage('Номер не найден в ответе MAX.');
        setStatusType('error');
      }
    } catch (error) {
      console.error(error);
      const code = error?.error?.code;
      if (code === 'client.request_phone.user_refused_provide_phone_number') {
        setStatusMessage('Пользователь отказался предоставить номер.');
      } else {
        setStatusMessage('Не удалось получить номер телефона.');
      }
      setStatusType('error');
    } finally {
      setContactRequested(false);
    }
  };

  const acceptPrivacy = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('privacyAccepted', 'true');
    }
    setPrivacyAccepted(true);
  };

  const addToCart = id => {
    setCart(prev => {
      const item = prev.find(product => product.id === id);
      if (item) {
        return prev.map(product => (product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
      }
      const menuItem = menuData.find(product => product.id === id);
      return [...prev, { ...menuItem, quantity: 1 }];
    });
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const confirmOrder = async () => {
    const normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length < 10) {
      setPhoneError(true);
      setOrderStatus('Введите корректный номер телефона.');
      return;
    }
    if (!address.trim()) {
      setOrderStatus('Укажите адрес доставки.');
      return;
    }

    const orderDetails = {
      items: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
      total: cartTotals.price,
      kcal: cartTotals.kcal,
      address: `${district}, ${address.trim()}`,
      phone,
      date: new Date().toLocaleString('ru-RU')
    };

    setIsSendingOrder(true);
    setOrderStatus('Отправка заказа...');

    try {
      const response = await fetch("/create-payment", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        amount: cartTotals.price,
        order: orderDetails,
        user: userInfo
    })
});

const payment = await response.json();

window.location.href = payment.url;
      setCart([]);
      setOrderStatus('✅ Заказ отправлен менеджеру.');
      if (window.WebApp?.HapticFeedback?.notificationOccurred) {
        window.WebApp.HapticFeedback.notificationOccurred('success');
      }
      window.setTimeout(() => {
        closeCheckout();
        setOrderStatus('');
      }, 1200);
    } catch (error) {
      console.error(error);
      setOrderStatus(error?.message ? `Ошибка отправки: ${error.message}` : 'Ошибка отправки. Попробуйте позже.');
      if (window.WebApp?.HapticFeedback?.notificationOccurred) {
        window.WebApp.HapticFeedback.notificationOccurred('error');
      }
    } finally {
      setIsSendingOrder(false);
    }
  };

  return (
    <>
      {!privacyAccepted && (
        <div className="privacy-overlay">
          <div className="privacy-modal">
            <h3>🔐 Конфиденциальность</h3>
            <p>
              Принимая условия, вы соглашаетесь с <a className="privacy-link" href="#">политикой обработки данных</a>.
            </p>
            <button className="accept-privacy-btn" onClick={acceptPrivacy}>
              ✅ Принять и продолжить
            </button>
          </div>
        </div>
      )}

      <div className="app-container">
        <div className="scrollable-content">
          <header className="header">
            <div>
              <span className="logo">🍲 Столовая</span>
              <div style={{ marginTop: 4, fontSize: 12, color: '#6b6b70' }}>
                {userInfo.fullName ? `Привет, ${userInfo.fullName}` : 'Привет, гость'}
              </div>
            </div>
            <button className="cart-icon-wrap" type="button" onClick={openCart}>
              <span>🛒</span>
              <span className="cart-badge" style={{ display: cartTotals.items === 0 ? 'none' : 'flex' }}>
                {cartTotals.items}
              </span>
            </button>
          </header>

          <section className="promo-banner">
            <div className="promo-text">
              <span className="promo-title">🔥 Горячее предложение</span>
              <span className="promo-sub">Закажи домашний обед – быстро и вкусно!</span>
            </div>
            <div className="promo-emoji">🍽️</div>
          </section>

          {statusMessage && (
            <div className={`status-banner ${statusType}`}>
              {statusMessage}
            </div>
          )}

          <div className="category-scroll">
            {categories.map(category => (
              <button
                key={category.key}
                type="button"
                className={`category-chip ${currentCategory === category.key ? 'active' : ''}`}
                onClick={() => setCurrentCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredMenu.map(item => (
              <article key={item.id} className="menu-item">
                <div className="item-emoji">
                  <img
                    className="item-image"
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={event => {
                      event.currentTarget.src = 'https://via.placeholder.com/120?text=🍲';
                    }}
                  />
                </div>
                <div className="item-title">{item.name}</div>
                <div className="item-kcal">🔥 {item.kcal} ккал</div>
                <div className="item-bottom">
                  <span className="price">{formatMoney(item.price)}</span>
                  <button className="add-btn" type="button" onClick={() => addToCart(item.id)}>
                    +
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="cart-panel">
          <div className="cart-summary">
            <span>🛒 {formatMoney(cartTotals.price)}</span>
            <span className="total-kcal">🔥 {cartTotals.kcal} ккал</span>
          </div>
          <button className="checkout-btn" type="button" onClick={openCheckout}>
            💳 Оплатить
          </button>
        </div>
      </div>

      {cartOpened && (
        <div className="cart-modal-overlay active" role="dialog" aria-modal="true">
          <div className="cart-modal">
            <button className="cart-modal-close" type="button" onClick={closeCart} aria-label="Закрыть корзину">
              ✕
            </button>
            <h3>🧾 Корзина</h3>
            <div className="cart-items-list">
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#8e8e93' }}>Корзина пуста</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="cart-item-row">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>{formatMoney(item.price * item.quantity)}</span>
                    <button className="remove-item-btn" type="button" onClick={() => removeFromCart(item.id)}>
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
            <p style={{ marginTop: 8 }}>
              <strong>Сумма:</strong> {formatMoney(cartTotals.price)} | 🔥 {cartTotals.kcal} ккал
            </p>
            {cart.length > 0 && (
              <button className="cart-order-btn" type="button" onClick={openCheckout}>
                ✅ Оформить заказ
              </button>
            )}
            <button className="close-cart-modal" type="button" onClick={closeCart}>
              Закрыть
            </button>
          </div>
        </div>
      )}

      {checkoutOpened && (
        <div className="checkout-popup-overlay active" role="dialog" aria-modal="true">
          <div className="checkout-popup">
            <div className="popup-header">
              <div className="popup-handle" />
              <button className="checkout-close" type="button" onClick={closeCheckout} aria-label="Закрыть оформление">
                ✕
              </button>
            </div>
            <div className="popup-title">📋 Оформление заказа</div>
            <div>
              <div className="field-label">📍 Район доставки</div>
              <select value={district} onChange={e => setDistrict(e.target.value)}>
                {districts.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div className="field-label">🏠 Адрес</div>
              <input
                className="address-input"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Улица, дом, кв."
              />
            </div>
            <div>
              <div className="field-label">📞 Телефон</div>
              <input
                className="phone-input"
                type="tel"
                value={phone}
                onChange={e => {
                  setPhone(e.target.value);
                  setPhoneError(false);
                }}
                placeholder="+7 999 123-45-67"
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                {window?.WebApp?.requestContact && (
                  <button
                    className="confirm-order-btn"
                    type="button"
                    onClick={requestContactFromMax}
                    disabled={contactRequested}
                    style={{ width: 'auto', padding: '10px 16px', fontSize: 14 }}
                  >
                    {contactRequested ? 'Запрос...' : 'Запросить номер из MAX'}
                  </button>
                )}
              </div>
              <div className="error-message" style={{ display: phoneError ? 'block' : 'none' }}>
                ⚠️ Введите номер телефона
              </div>
            </div>
            <div className="popup-total-row">
              <span>Итого:</span>
              <span>
                <strong>{formatMoney(cartTotals.price)}</strong> · 🔥 {cartTotals.kcal} ккал
              </span>
            </div>
            {orderStatus && (
              <div
                className="order-status-message"
                style={{
                  marginTop: 10,
                  color: orderStatus.startsWith('Ошибка') ? '#d32f2f' : '#2e7d32',
                  fontSize: 14,
                  minHeight: 22
                }}
              >
                {orderStatus}
              </div>
            )}
            <button className="confirm-order-btn" type="button" onClick={confirmOrder} disabled={isSendingOrder}>
              {isSendingOrder ? 'Отправка...' : '✅ Подтвердить заказ'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
