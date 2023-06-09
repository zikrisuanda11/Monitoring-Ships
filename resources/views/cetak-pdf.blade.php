<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF</title>
    <style>
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
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;

        }

        body h3 {
            text-align: center;
        }

        .report-daily table,
        .report-daily th,
        .report-daily td {
            border: 1px solid #999;
            padding: 5px;
            font-size: small;

        }

        .time table td {
            border: none;
        }

        .report-daily tbody {
            text-align: center;
            align-items: center;
        }

        #eta,
        #etd {
            width: 100px;

        }

        .tanda-tangan {
            position: absolute;
            left: 500px;
            top: 600px;
        }
    </style>

</head>

<body>
    <div class="time">
        {{-- ubah jadi range --}}
        <table>
            <tr>
                <td>Hari</td>
                <td>:</td>
                <td>{{ $dayStartDate }}</td>
            </tr>
            <tr>
                <td>Tanggal</td>
                <td>:</td>
                <td>{{ $formattedStartDate . ' s/d ' . $formattedEndDate }}</td>
            </tr>
        </table>
    </div>
    <h3>Laporan Mingguan Monitoring Penjadwalan Kapal</h3>
    <div class="report-daily">
        <table>
            <thead>
                <tr>
                    <th>Vessel ID</th>
                    <th>Nama Kapal</th>
                    <th>Nama Agent</th>
                    <th id="eta">ETA</th>
                    <th id="etd">ETD</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($weekActivities as $weekActivity)
                    <tr>
                        <td>{{ $weekActivity->activity_id }}</td>
                        <td>{{ $weekActivity->ships->ship_name }}</td>
                        <td>{{ $weekActivity->ships->agent }}</td>
                        <td>{{ $weekActivity->eta }}</td>
                        <td>{{ $weekActivity->etd }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        <p>
            Catatan:
        </p>
        <ul>
            <li>Data ini mengambil data 1 Minggu</li>
            <li>-</li>
            <li>Kapal Franz Paucek PhD Ketinggalan Tas</li>
        </ul>
    </div>
    <div class="tanda-tangan">
        <div style="width: 200px;">
            <p style="margin-left: 35px">Staff Operasional</p>
            <br>
            <p style="margin-left: 80px">{{$user_name}}</p>
        </div>
    </div>
</body>

</html>