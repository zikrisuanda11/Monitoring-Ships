<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF</title>
    <style>
        * {
            font-family: 'Times New Roman', Times, serif;
            font-size: 16px;
        }

        body {
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
        }

        .report-daily table {
            width: 100%;
            text-align: left;
            border-collapse: collapse;
        }

        body h3 {
            text-align: center;
        }

        .report-daily th,
        .report-daily td {
            padding-bottom: 5px;
            border: 1px solid #999;
            font-size: 12px;
        }

        .report-daily th {
            /* border-bottom: 1px solid #999; */
        }

        .time table td {
            border: none;
        }

        .report-daily tbody {
            text-align: center;
            align-items: center;
        }

        #vessel_id {
            width: 100px;
        }
    </style>

</head>

<body>
    <div class="time">
        <table>
            <tr>
                <td>Lokasi</td>
                <td>:</td>
                <td>Pelabuhan Semayang Balikpapan</td>
            </tr>
            <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>{{ $formattedStartDate . ' - ' . $formattedEndDate }}</td>
            </tr>
        </table>
    </div>
    <h3>Laporan Mingguan Monitoring Penjadwalan Kapal</h3>
    <div class="report-daily">
        <table>
            <thead>
                <tr>
                    <th id="vessel_id">Vessel ID</th>
                    <th>Nama Kapal</th>
                    <th id="eta">ETA</th>
                    <th id="etd">ETD</th>
                    <th>Service Code</th>
                </tr>
            </thead>
            <tbody>
                @if (count($weekActivities) != 0)
                    @foreach ($weekActivities as $weekActivity)
                        <tr>
                            <td>{{ $weekActivity->activity_id }}</td>
                            <td>{{ $weekActivity->ships->ship_name }}</td>
                            <td>{{ $weekActivity->eta }}</td>
                            <td>{{ $weekActivity->etd }}</td>
                            <td>{{ Str::titleCase(str_replace('_', ' ', $weekActivity->service_code)) }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <th colspan="5">tidak ada data</th>
                    </tr>
                @endif
            </tbody>
        </table>
        <strong>
            Catatan:
        </strong>
        <ul style="font-size: 16px">
            <li>Laporan mencakup periode mingguan berdasarkan tanggal laporan</li>
            <li>Laporan evaluasi dilakukan terhadap pelaksanaan jadwal keberangkatan dan kedatangan kapal</li>
        </ul>
    </div>
    <div class="tanda-tangan" style=" margin-top: 100px">
        <div style="width: 200px; display: inline-block; margin-right: 140px;">
            <p style="margin-left: 40px">Staff Operasional</p>
            <br>
            <p style="text-align: center;">{{ $user_name }}</p>
        </div>
        <div style="width: 240px; display: inline-block; ">
            <p style="text-align: center">Balikpapan, {{ $formattedEndDate }}</p>
            <p style="text-align: center">Manager Pelayanan Kapal</p>
            <br>
            <p style="text-align: center">Ali Rodriguez</p>
        </div>
    </div>
</body>

</html>
