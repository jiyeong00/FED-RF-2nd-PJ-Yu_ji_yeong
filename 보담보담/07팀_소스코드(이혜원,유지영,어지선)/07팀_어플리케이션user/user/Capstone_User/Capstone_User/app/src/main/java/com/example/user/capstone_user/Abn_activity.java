package com.example.user.capstone_user;

import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.NotificationCompat;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.example.user.capstone_user.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

public class Abn_activity extends Activity {
    Button abnBack,btnTest;
    ListView listView;
    ArrayList<String> midList;
    ArrayAdapter<String> adapter;

    TextView test;

    long now = System.currentTimeMillis();
    Date date=new Date(now);
    SimpleDateFormat sdfNow=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
    String formatDate = sdfNow.format(date);
    String dateNow;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.abn_activity);
        abnBack=(Button)findViewById(R.id.abn_back);
        listView = (ListView) findViewById(R.id.list);


//        String url = "http://192.168.0.12/User_Abn_insert.php";
        String url = "http://172.16.120.18/User_Abn_insert.php";

        midList = new ArrayList<String>();
        adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, midList);
        listView.setAdapter(adapter);
        dateNow=formatDate;

        Abn_activity.NetworkTask networkTask = new Abn_activity.NetworkTask(url, null);
        networkTask.execute();

        abnBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });

        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> adapterView, View view, int i, long l) {
                midList.remove(i);
                adapter.notifyDataSetChanged();
                return false;
            }
        });
    }

    private void showNoti(){
        Intent intent=new Intent(this,Abn_activity.class);
        PendingIntent pendingIntent=PendingIntent.getActivity(this,101,intent,PendingIntent.FLAG_UPDATE_CURRENT);
        NotificationCompat.Builder builder=new NotificationCompat.Builder(this,"default");
        builder.setSmallIcon(R.drawable.ic_launcher_background);
        builder.setContentTitle("이상발생");
        builder.setContentText("공지를 확인해주세요.");
        builder.setAutoCancel(true);
        builder.setContentIntent(pendingIntent);

        NotificationManager manager=(NotificationManager)this.getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT>=Build.VERSION_CODES.O){
            manager.createNotificationChannel(new NotificationChannel("default","기본채널",NotificationManager.IMPORTANCE_DEFAULT));
        }
        manager.notify(1,builder.build());

    }

    public class NetworkTask extends AsyncTask<Void, Void, String> {

        private String url;
        private ContentValues values;

        public NetworkTask(String url, ContentValues values) {

            this.url = url;
            this.values = values;
        }

        @Override
        protected String doInBackground(Void... params) {

            String result; // 요청 결과를 저장할 변수.
            RequestHttpURLConnection requestHttpURLConnection = new RequestHttpURLConnection();
            result = requestHttpURLConnection.request(url, values); // 해당 URL로 부터 결과물을 얻어온다.

            return result;
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            try{
                showNoti();
                String result="";
                String state1 ="1";
                JSONObject order=new JSONObject(s);
                JSONArray index=order.getJSONArray("webnautes");
                for (int i=0;i<index.length();i++) {
                    JSONObject tt = index.getJSONObject(i);
                    if (tt.getString("lckOutbreak").equals(state1)){
                        result = "학번 : " + tt.getString("stdId") + "\n" +
                                "이름 : "+ tt.getString("stdName") + "\n"+
                                "사물함코드 : "+ tt.getString("lckId") + "\n"+
                                "시각 : "+ dateNow +"\n"+
                                "사물함에 이상이 발생하였습니다. "+"\n";
                        midList.add(result);
//                        result="";
                    }
                    else
                        result += "오류 발생, 텍스트 내용이 나오지 않습니다";

                }

                adapter.notifyDataSetChanged();
            }catch (JSONException e){
                ;
            }
        }
        //doInBackground()로 부터 리턴된 값이 onPostExecute()의 매개변수로 넘어오므로 s를 출력한다.
    }
}
