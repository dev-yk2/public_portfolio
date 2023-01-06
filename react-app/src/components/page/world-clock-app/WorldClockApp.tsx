import React, { useState } from 'react'

import Layout from './layout/Layout'
import { ClockTimeZone } from './ClockTimeZone'
import { ClockProvider } from './ClockContext'
import { ClockLogic } from './ClockLogic'
import { ClockSettings } from './ClockSettings'

const WorldClockApp: React.FC = () => {

  const defaultTimeZoneList = [
    {title: '国際日付変更線 西側', timeZone: 'Etc/GMT+12', select: true},
    {title: '協定世界時-11', timeZone: 'Etc/GMT+11', select: true},
    {title: 'ハワイ', timeZone: 'Pacific/Honolulu', select: true},
    {title: 'アラスカ', timeZone: 'America/Anchorage', select: true},
    {title: 'バハカリフォルニア', timeZone: 'America/Santa_Isabel', select: true},
    {title: '太平洋標準時(米国およびカナダ)', timeZone: 'America/Los_Angeles', select: true},
    {title: 'チワワ、ラパス、マサトラン', timeZone: 'America/Chihuahua', select: true},
    {title: 'アリゾナ', timeZone: 'America/Phoenix', select: true},
    {title: '山地標準時(米国およびカナダ)', timeZone: 'America/Denver', select: true},
    {title: '中央アメリカ', timeZone: 'America/Guatemala', select: true},
    {title: '中部標準時(米国およびカナダ)', timeZone: 'America/Chicago', select: true},
    {title: 'サスカチュワン', timeZone: 'America/Regina', select: true},
    {title: 'グアダラハラ、メキシコシティ、モンテレー', timeZone: 'America/Mexico_City', select: true},
    {title: 'ボゴタ、リマ、キト', timeZone: 'America/Bogota', select: true},
    {title: 'インディアナ東部', timeZone: 'America/Indiana/Indianapolis', select: true},
    {title: '東部標準時(米国およびカナダ)', timeZone: 'America/New_York', select: true},
    {title: 'カラカス', timeZone: 'America/Caracas', select: true},
    {title: '大西洋標準時(カナダ)', timeZone: 'America/Halifax', select: true},
    {title: 'アスンシオン', timeZone: 'America/Asuncion', select: true},
    {title: 'ジョージタウン、ラパス、マナウス、サンフアン', timeZone: 'America/La_Paz', select: true},
    {title: 'クイアバ', timeZone: 'America/Cuiaba', select: true},
    {title: 'サンチアゴ', timeZone: 'America/Santiago', select: true},
    {title: 'ニューファンドランド', timeZone: 'America/St_Johns', select: true},
    {title: 'ブラジリア', timeZone: 'America/Sao_Paulo', select: true},
    {title: 'グリーンランド', timeZone: 'America/Godthab', select: true},
    {title: 'カイエンヌ、フォルタレザ', timeZone: 'America/Cayenne', select: true},
    {title: 'ブエノスアイレス', timeZone: 'America/Argentina/Buenos_Aires', select: true},
    {title: 'モンテビデオ', timeZone: 'America/Montevideo', select: true},
    {title: '協定世界時-2', timeZone: 'Etc/GMT+2', select: true},
    {title: 'カーボベルデ諸島', timeZone: 'Atlantic/Cape_Verde', select: true},
    {title: 'アゾレス', timeZone: 'Atlantic/Azores', select: true},
    {title: 'カサブランカ', timeZone: 'Africa/Casablanca', select: true},
    {title: 'モンロビア、レイキャビク', timeZone: 'Atlantic/Reykjavik', select: true},
    {title: 'ダブリン、エジンバラ、リスボン、ロンドン', timeZone: 'Europe/London', select: true},
    {title: '協定世界時', timeZone: 'Etc/GMT', select: true},
    {title: 'アムステルダム、ベルリン、ベルン、ローマ、ストックホルム、ウィーン', timeZone: 'Europe/Berlin', select: true},
    {title: 'ブリュッセル、コペンハーゲン、マドリード、パリ', timeZone: 'Europe/Paris', select: true},
    {title: '西中央アフリカ', timeZone: 'Africa/Lagos', select: true},
    {title: 'ベオグラード、ブラチスラバ、ブダペスト、リュブリャナ、プラハ', timeZone: 'Europe/Budapest', select: true},
    {title: 'サラエボ、スコピエ、ワルシャワ、ザグレブ', timeZone: 'Europe/Warsaw', select: true},
    {title: 'ウィントフック', timeZone: 'Africa/Windhoek', select: true},
    {title: 'アテネ、ブカレスト、イスタンブール', timeZone: 'Europe/Istanbul', select: true},
    {title: 'ヘルシンキ、キーウ、リガ、ソフィア、タリン、ビリニュス', timeZone: 'Europe/Kiev', select: true},
    {title: 'カイロ', timeZone: 'Africa/Cairo', select: true},
    {title: 'ダマスカス', timeZone: 'Asia/Damascus', select: true},
    {title: 'アンマン', timeZone: 'Asia/Amman', select: true},
    {title: 'ハラーレ、プレトリア', timeZone: 'Africa/Johannesburg', select: true},
    {title: 'エルサレム', timeZone: 'Asia/Jerusalem', select: true},
    {title: 'ベイルート', timeZone: 'Asia/Beirut', select: true},
    {title: 'バグダッド', timeZone: 'Asia/Baghdad', select: true},
    {title: 'ミンスク', timeZone: 'Europe/Minsk', select: true},
    {title: 'クエート、リヤド', timeZone: 'Asia/Riyadh', select: true},
    {title: 'ナイロビ', timeZone: 'Africa/Nairobi', select: true},
    {title: 'テヘラン', timeZone: 'Asia/Tehran', select: true},
    {title: 'モスクワ、サンクトペテルブルグ、ボルゴグラード', timeZone: 'Europe/Moscow', select: true},
    {title: 'トビリシ', timeZone: 'Asia/Tbilisi', select: true},
    {title: 'エレバン', timeZone: 'Asia/Yerevan', select: true},
    {title: 'アブダビ、マスカット', timeZone: 'Asia/Dubai', select: true},
    {title: 'バクー', timeZone: 'Asia/Baku', select: true},
    {title: 'ポートルイス', timeZone: 'Indian/Mauritius', select: true},
    {title: 'カブール', timeZone: 'Asia/Kabul', select: true},
    {title: 'タシケント', timeZone: 'Asia/Tashkent', select: true},
    {title: 'イスラマバード、カラチ', timeZone: 'Asia/Karachi', select: true},
    {title: 'スリジャヤワルダナプラコッテ', timeZone: 'Asia/Colombo', select: true},
    {title: 'チェンナイ、コルカタ、ムンバイ、ニューデリー', timeZone: 'Asia/Kolkata', select: true},
    {title: 'カトマンズ', timeZone: 'Asia/Kathmandu', select: true},
    {title: 'アスタナ', timeZone: 'Asia/Almaty', select: true},
    {title: 'ダッカ', timeZone: 'Asia/Dhaka', select: true},
    {title: 'エカテリンブルグ', timeZone: 'Asia/Yekaterinburg', select: true},
    {title: 'ヤンゴン', timeZone: 'Asia/Yangon', select: true},
    {title: 'バンコク、ハノイ、ジャカルタ', timeZone: 'Asia/Bangkok', select: true},
    {title: 'ノヴォシビルスク', timeZone: 'Asia/Novosibirsk', select: true},
    {title: 'クラスノヤルスク', timeZone: 'Asia/Krasnoyarsk', select: true},
    {title: 'ウランバートル', timeZone: 'Asia/Ulaanbaatar', select: true},
    {title: '北京、重慶、香港、ウルムチ', timeZone: 'Asia/Shanghai', select: true},
    {title: 'パース', timeZone: 'Australia/Perth', select: true},
    {title: 'クアラルンプール、シンガポール', timeZone: 'Asia/Singapore', select: true},
    {title: '台北', timeZone: 'Asia/Taipei', select: true},
    {title: 'イルクーツク', timeZone: 'Asia/Irkutsk', select: true},
    {title: 'ソウル', timeZone: 'Asia/Seoul', select: true},
    {title: '大阪、札幌、東京', timeZone: 'Asia/Tokyo', select: true},
    {title: 'ダーウィン', timeZone: 'Australia/Darwin', select: true},
    {title: 'アデレード', timeZone: 'Australia/Adelaide', select: true},
    {title: 'ホバート', timeZone: 'Australia/Hobart', select: true},
    {title: 'ヤクーツク', timeZone: 'Asia/Yakutsk', select: true},
    {title: 'ブリスベン', timeZone: 'Australia/Brisbane', select: true},
    {title: 'グアム、ポートモレスビー', timeZone: 'Pacific/Port_Moresby', select: true},
    {title: 'キャンベラ、メルボルン、シドニー', timeZone: 'Australia/Sydney', select: true},
    {title: 'ウラジオストク', timeZone: 'Asia/Vladivostok', select: true},
    {title: 'ソロモン諸島、ニューカレドニア', timeZone: 'Pacific/Guadalcanal', select: true},
    {title: '協定世界時+12', timeZone: 'Etc/GMT-12', select: true},
    {title: 'フィジー、マーシャル諸島', timeZone: 'Pacific/Fiji', select: true},
    {title: 'マガダン', timeZone: 'Asia/Magadan', select: true},
    {title: 'オークランド、ウェリントン', timeZone: 'Pacific/Auckland', select: true},
    {title: 'ヌクアロファ', timeZone: 'Pacific/Tongatapu', select: true},
    {title: 'サモア', timeZone: 'Pacific/Apia', select: true},
  ]

  const [refreshInterval, setRefreshInterval] = useState<number | null>(1000)
  const [timeZoneList, setTimeZoneList] = useState<{title: string, timeZone: string, select: boolean}[]>(defaultTimeZoneList)
  const [selectedTimeZoneList, setSelectedTimeZoneList] = useState<{title: string, timeZone: string}[]>([])

  const selectTimeZone = (index: number) => {
    const timeZoneItem = {
      title: timeZoneList[index].title,
      timeZone: timeZoneList[index].timeZone,
    }

    setSelectedTimeZoneList(prevState => {
      return [
        ...prevState,
        timeZoneItem,
      ]
    })

    setTimeZoneList(prevState => {
      const newState = [...prevState]
      newState[index].select = false
      return newState
    })
  }

  const removeTimeZone = (index: number) => {
    const removeTimeZoneItem = selectedTimeZoneList[index]

    setSelectedTimeZoneList(prevState => {
      return prevState.filter(v => v.timeZone !== removeTimeZoneItem.timeZone)
    })

    setTimeZoneList(prevState => {
      return prevState.map(v => {
        if (v.timeZone === removeTimeZoneItem.timeZone) {
          v.select = true
        }
        return v
      })
    })
  }

  return (
    <Layout>

      <ClockTimeZone
        timeZoneList={timeZoneList}
        selectTimeZone={selectTimeZone}
      />

      <ClockProvider
        localTimeZone="Asia/Tokyo"
        refreshInterval={refreshInterval}
      >

        <ClockLogic
          timeZoneList={selectedTimeZoneList}
          removeTimeZone={removeTimeZone}
        />

        <ClockSettings
          refreshInterval={refreshInterval}
          onIntervalChange={setRefreshInterval}
        />

      </ClockProvider>

    </Layout>
  )
}

export default WorldClockApp
